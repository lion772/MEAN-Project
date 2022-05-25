import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
})
export class PostCreateComponent {
  values: string = '';
  //@HostListener('click', ['$event']) onClick(event) {
  //  console.log('component is clicked');
  //  console.log(event);
  // }

  onAddPost() {
    console.log('save button clicked');
    console.log(this.values);
  }

  onKey(event: any) {
    // without type info
    this.values += event.target.value;
    // console.log(this.values);
  }
}
