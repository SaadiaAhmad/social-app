import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../posts.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  // @Output() resetPosts = new EventEmitter();

  constructor(private postsService: PostsService) {}

  onSubmitClick(form: NgForm) {
    if(form.invalid) return;
    const post: Post = {
      title: form.value.enteredTitle || 'Title',
      content: form.value.enteredContent || 'Content'
    };

    this.postsService.addPost(post);
    form.resetForm();
  }

  // onResetClick() {
  //   this.resetPosts.emit();
  // }
}
