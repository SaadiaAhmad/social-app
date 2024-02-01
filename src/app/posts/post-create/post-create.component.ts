import { Component, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string;
  isLoading = false;
  post: Post;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.isLoading = true;
        this.postsService.getPost(this.postId)
          .subscribe(post => {
            this.post = post;
            this.isLoading = false;
          });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSubmitClick(form: NgForm) {
    if(form.invalid) return;

    this.isLoading = true;
    
    if(this.mode === 'create') {
      this.addPost(form);
    } else {
      this.updatePost(form);
    }

    form.resetForm();
    this.router.navigate(['/']);
  }

  addPost(form: NgForm) {
    const post: Post = {
      id: null,
      title: form.value.enteredTitle,
      content: form.value.enteredContent
    };

    this.postsService.addPost(post);
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
