import { Injectable } from '@angular/core';
import { Post } from './posts.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    this.httpClient.get<{message: string, posts: any[]}>('http://localhost:3000/api/posts')
      .pipe(
        map((resp) => {
          return resp.posts.map((postItem) => {
            return {
                id: postItem._id,
                title: postItem.title,
                content: postItem.content
            }
          });
        })
      )
      .subscribe((mappedPosts) => {
        this.posts = mappedPosts;
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

    this.httpClient.post<{message: string}>('http://localhost:3000/api/posts', newPost)
      .subscribe((resp) => {
        this.posts.push(newPost);
        this.updatedPosts.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.httpClient.delete<{message: string}>(`http://localhost:3000/api/posts/${postId}`)
    .subscribe((resp) => {
      const deletedItemIndex = this.posts.findIndex((post) => post.id === postId);
      this.posts.splice(deletedItemIndex, 1);
      this.updatedPosts.next([...this.posts]);
    });
  }
}
