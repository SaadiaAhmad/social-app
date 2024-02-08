import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post, PostData } from '../posts.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizes = [1, 2, 5, 10];
  isUserAuthenticated = false;
  private subscriptions = new Subscription;

  constructor(private postsService: PostsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.subscriptions.add(
      this.postsService.getUpdatedPosts().subscribe((postData: PostData) => {
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
        this.isLoading = false;
      })
    );
    this.subscriptions.add(
      this.authService.getAuthStatusListener().subscribe((isAuth: boolean) => {
        this.isUserAuthenticated = isAuth;
      })
    );
  }

  onPageChange(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onPostDelete(id: string) {
    this.isLoading = true;
    this.postsService.deletePost(id).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
