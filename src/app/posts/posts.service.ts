import { Injectable } from '@angular/core';
import { Post } from './post.model';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>(); //Observable
  constructor(private http: HttpClient) {}

  getPosts() {
    //don't want to return the original array. Instead, return a copy to not
    //affect the original array and try to be immutable.
    this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable(); // return an object to which we can listen
  }

  addPosts(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]); //it pushes and emits a new value
  }
}

//A Subject is Observable and Observer at the same time. Since it is an Observer, we can emit events with next(). Since it is also an Observable, we can subscribe to these events.
//With asObservable() we take care that from outside the service it is only accessible as an Observable, so that noone outside the service can accidentally add events to it, only subscribe to it.
