import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../posts.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  @Output() postCreated = new EventEmitter();
  enteredContent = '';
  enteredTitle = '';

  onSubmitClick() {
    const post: Post = {
      title: this.enteredTitle || 'Title',
      content: this.enteredContent || 'Content'
    };

    this.postCreated.emit(post);
  }
}
