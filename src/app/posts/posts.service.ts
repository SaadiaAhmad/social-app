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
          return resp.posts.map((postItem) => this.mapPostResponse(postItem));
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

    this.httpClient.post<{message: string, id: string}>('http://localhost:3000/api/posts', newPost)
      .subscribe((resp) => {
        newPost.id = resp.id;
        this.posts.push(newPost);
        this.updatedPosts.next([...this.posts]);
      });
  }

  updatePost(post: Post) {
    const updatedPost: Post = {
      id: post.id,
      title: post.title,
      content: post.content
    };

    this.httpClient.put<{message: string}>(`http://localhost:3000/api/posts/${post.id}`, updatedPost)
      .subscribe((resp) => {
        const oldPostIndex = this.posts.findIndex((post) => post.id === updatedPost.id);
        const tempPosts = [...this.posts];
        tempPosts[oldPostIndex] = updatedPost;
        this.posts = tempPosts; //immutable way of updating the posts
        this.updatedPosts.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.httpClient.delete<{message: string}>(`http://localhost:3000/api/posts/${postId}`)
    .subscribe((resp) => {
      const deletedItemIndex = this.posts.findIndex((post) => post.id === postId);
      this.posts.splice(deletedItemIndex, 1);
      //const postsUpdated = this.posts.filter(post => post.id !== postId); //This will not work when we delete more than one posts in one go/app load
      this.updatedPosts.next([...this.posts]);
    });
  }

  getPost(id: string) {
    return {...this.posts.find((post) => post.id === id)}
  }

  private mapPostResponse(postItem: any) {
    return {
      id: postItem._id,
      title: postItem.title,
      content: postItem.content
  }
  }
}
