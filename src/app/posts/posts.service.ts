import { Injectable } from '@angular/core';
import { Post } from './posts.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post: Post) {
    const newPost: Post = {
      title: post.title,
      content: post.content
    };

    this.posts.push(newPost);
    this.updatedPosts.next([...this.posts]);
  }
}
