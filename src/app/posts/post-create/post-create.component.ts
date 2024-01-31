import { Component, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  post: Post;

  constructor(private postsService: PostsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSubmitClick(form: NgForm) {
    if(form.invalid) return;

    if(this.mode === 'create') {
      this.addPost(form);
    } else {
      this.updatePost(form);
    }

    form.resetForm();
  }

  addPost(form: NgForm) {
    const post: Post = {
      id: null,
      title: form.value.enteredTitle,
      content: form.value.enteredContent
    };

    this.postsService.addPost(post);
    form.resetForm();
  }

  updatePost(form: NgForm) {
    const post: Post = {
      id: this.post.id,
      title: form.value.enteredTitle,
      content: form.value.enteredContent
    };

    this.postsService.updatePost(post);
  }
}
