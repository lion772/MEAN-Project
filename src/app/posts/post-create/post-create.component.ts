import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  public postId: string;
  editTitle: string;
  editContent: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.editTitle = paramMap.get('title');
        this.editContent = paramMap.get('content');
      } else {
        this.postId = null;
      }
    });
  }

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    this.postsService.addPosts(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }
}
