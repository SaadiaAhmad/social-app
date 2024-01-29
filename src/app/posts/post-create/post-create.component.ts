import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../posts.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  @Output() postCreated = new EventEmitter<Post>();
  @Output() resetPosts = new EventEmitter();

  onSubmitClick(form: NgForm) {
    if(form.invalid) return;
    const post: Post = {
      title: form.value.enteredTitle || 'Title',
      content: form.value.enteredContent || 'Content'
    };

    this.postCreated.emit(post);
  }

  onResetClick() {
    this.resetPosts.emit();
  }
}
