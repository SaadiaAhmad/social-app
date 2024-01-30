import { Injectable } from '@angular/core';
import { Post } from './posts.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((resp) => {
        console.log(resp);
        this.posts = resp.posts;
        this.updatedPosts.next([...this.posts]);
      });
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post: Post) {
    const newPost: Post = {
      id: post.id,
      title: post.title,
      content: post.content
    };

    this.posts.push(newPost);
    this.updatedPosts.next([...this.posts]);
  }
}
