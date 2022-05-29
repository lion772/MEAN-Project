import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    //don't want to return the original array. Instead, return a copy to not
    //affect the original array and try to be immutable.
    return [...this.posts];
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable(); // return an object to which we can listen
  }

  addPosts(title: string, content: string) {
    const post: Post = { title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]); //it pushes and emits a new value
  }
}
