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
  isLoading = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.subscriptions.add(
      this.postsService.getUpdatedPosts().subscribe((posts) => {
        this.posts = posts;
        this.isLoading = false;
      })
    );
  }

  onPostDelete(id: string) {
    this.postsService.deletePost(id);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
