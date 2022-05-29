import { Post } from './post.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];

  getPosts() {
    //don't want to return the original array. Instead, return a copy to not
    //affect the original array and try to be immutable.
    return [...this.posts];
  }

  //addPosts(title: string, content:string) {
  //  const post:Post = {title:title, content:content}
  //  this.posts.push(post);
  //}

  addPosts(post: Post) {
    this.posts.push(post);
  }
}
