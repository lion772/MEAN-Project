import { Injectable } from '@angular/core';
import { Post } from './post.model';

import { catchError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>(); //Observable
  constructor(private http: HttpClient) {}

  getPosts() {
    //don't want to return the original array. Instead, return a copy to not
    //affect the original array and try to be immutable.
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((transformedData) => {
        this.posts = transformedData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable(); // return an object to which we can listen
  }

  addPosts(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts',
        post
      )
      .pipe(
        map((response) => {
          return response.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.posts = [...responseData];
        this.postsUpdated.next([...this.posts]);
      });
    //it pushes and emits a new value
  }

  deletePost(postId: string) {
    this.http
      .delete<{ message: string; posts: any }>(
        `http://localhost:3000/api/posts/${postId}`
      )
      .pipe(
        map((responseData) => {
          return responseData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((data) => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}

//A Subject is Observable and Observer at the same time. Since it is an Observer, we can emit events with next(). Since it is also an Observable, we can subscribe to these events.
//With asObservable() we take care that from outside the service it is only accessible as an Observable, so that noone outside the service can accidentally add events to it, only subscribe to it.
