import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[];
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 2;
  pageSizes = [1, 2, 5, 10];
  private subscriptions = new Subscription;

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

  onPageChange(pageData: PageEvent) {

  }

  onPostDelete(id: string) {
    this.postsService.deletePost(id);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
