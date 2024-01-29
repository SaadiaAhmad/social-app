import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[];
  private subscriptions = new Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.postsService.getUpdatedPosts().subscribe((posts) => {
        this.posts = posts;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
