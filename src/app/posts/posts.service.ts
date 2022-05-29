import { Post } from './post.model';

export class PostsService {
  private posts: Post[] = [];

  getPosts() {
    //don't want to return the original array. Instead, return a copy to not
    //affect the original array and try to be immutable.
    return [...this.posts];
  }
}
