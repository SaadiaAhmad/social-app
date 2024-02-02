import { Injectable } from '@angular/core';
import { Post } from './posts.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPosts() {
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
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

  addPost(post: Post, image: File) {
    const postFormData = new FormData();
    postFormData.append("title", post.title);
    postFormData.append("content", post.content);
    if(image) postFormData.append("image", image, post.title);

    this.httpClient.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postFormData)
      .subscribe((resp) => {
        /* --- This is not really needed because the post-list component will call all the posts again anyway ---*/
        // const newPost: Post = {
        //   id: resp.post.id,
        //   title: post.title,
        //   content: post.content,
        //   imagePath: resp.post.imagePath
        // };
        // this.posts.push(newPost);
        // this.updatedPosts.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(post: Post, image: File) {
    let updatedPost: FormData | Post;
    if(image) {
      updatedPost = new FormData();
      updatedPost.append("title", post.title);
      updatedPost.append("content", post.content);
      updatedPost.append("image", image, post.title);
    } else {
      updatedPost = {
        id: post.id,
        title: post.title,
        content: post.content,
        imagePath: post.imagePath
      };
    }

    this.httpClient.put<{message: string}>(`http://localhost:3000/api/posts/${post.id}`, updatedPost)
      .subscribe((resp) => {
        /* --- This is not really needed because the post-list component will call all the posts again anyway ---*/
        // const oldPostIndex = this.posts.findIndex((post) => post.id === updatedPost.id);
        // const tempPosts = [...this.posts];
        // tempPosts[oldPostIndex] = updatedPost;
        // this.posts = tempPosts; //immutable way of updating the posts
        // this.updatedPosts.next([...this.posts]);
        this.router.navigate(['/']);
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
    return this.httpClient.get<{message: string, post: any}>(`http://localhost:3000/api/posts/${id}`)
      .pipe(map((respData => {
        return {
          id: respData.post._id,
          title: respData.post.title,
          content: respData.post.content,
          imagePath: respData.post.imagePath
        }
      }))
      );
  }

  private mapPostResponse(postItem: any) {
    return {
      id: postItem._id,
      title: postItem.title,
      content: postItem.content,
      imagePath: postItem.imagePath
  }
  }
}
