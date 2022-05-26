import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  newPost: string = '';

  onAddPost() {
    console.log('save button clicked');
    console.log(this.newPost);
  }

  onKey(event: any) {
    //this.newPost += event.target.value;
    // console.log(this.newPost);
  }
}
