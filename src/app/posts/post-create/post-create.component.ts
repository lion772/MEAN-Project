import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  public postId: string;
  post: Post;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log(`this post has id ? ${paramMap.get('postId')}`);
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
        console.log(`Edit post : ${this.post}`);
      } else {
        this.postId = null;
      }
    });
  }

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    if (this.postId) {
      this.postsService.updatePost(
        this.postId,
        postForm.value.title,
        postForm.value.content
      );
    } else {
      this.postsService.addPosts(postForm.value.title, postForm.value.content);
    }
    postForm.resetForm();
  }
}
