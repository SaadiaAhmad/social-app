import { Component, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  form: FormGroup;

  constructor(private postsService: PostsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.createForm();
    this.initializeForm();
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      content: new FormControl(null, { validators: [Validators.required] })
    });
  }

  initializeForm() {
    this.route.paramMap.subscribe((paramMap) => {
      if(paramMap.has('id')) {
        this.setEditMode(paramMap);
      } else {
        this.setCreateMode();
      }
    });
  }

  setEditMode(paramMap: ParamMap) {
    this.mode = 'edit';
    this.postId = paramMap.get('id');
    this.isLoading = true;
    this.postsService.getPost(this.postId)
      .subscribe(post => {
        this.post = post;
        this.isLoading = false;
        this.form.setValue({
          title: this.post.title,
          content: this.post.content
        });
      });
  }

  setCreateMode() {
    this.mode = 'create';
    this.postId = null;
  }

  onSubmitClick() {
    if(this.form.invalid) return;

    this.isLoading = true;
    
    if(this.mode === 'create') {
      this.addPost();
    } else {
      this.updatePost();
    }

    this.form.reset();
  }

  addPost() {
    const post: Post = {
      id: null,
      title: this.form.value.title,
      content: this.form.value.content
    };

    this.postsService.addPost(post);
  }

  updatePost() {
    const post: Post = {
      id: this.post.id,
      title: this.form.value.title,
      content: this.form.value.content
    };

    this.postsService.updatePost(post);
  }
}
