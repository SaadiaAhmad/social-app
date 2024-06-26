import { Injectable } from '@angular/core';
import { Post, PostData } from './posts.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const POST_API_BASE_PATH = `${environment.apiBasePath}/posts`;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<PostData>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPosts(pageSize: number, currentPage: number) {
    const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
    this.httpClient.get<{message: string, posts: Post[], totalPosts: number}>(POST_API_BASE_PATH + queryParams)
      .pipe(
        map((resp) => {
          return {
            totalPosts: resp.totalPosts,
            posts: resp.posts.map((postItem) => this.mapPostResponse(postItem))
          };
        })
      )
      .subscribe((mappedPostData) => {
        this.posts = mappedPostData.posts;
        this.updatedPosts.next({posts: [...this.posts], postCount: mappedPostData.totalPosts});
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

    this.httpClient.post<{message: string, post: Post}>(POST_API_BASE_PATH, postFormData)
      .subscribe((resp) => {
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
        ...post,
        title: post.title,
        content: post.content,
      };
    }

    this.httpClient.put<{message: string}>(`${POST_API_BASE_PATH}/${post.id}`, updatedPost)
      .subscribe((resp) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.httpClient.delete<{message: string}>(`${POST_API_BASE_PATH}/${postId}`);
  }

  getPost(id: string) {
    return this.httpClient.get<{message: string, post: any}>(`${POST_API_BASE_PATH}/${id}`)
      .pipe(map((respData => {
        return {
          id: respData.post._id,
          title: respData.post.title,
          content: respData.post.content,
          imagePath: respData.post.imagePath,
          owner: respData.post.owner
        }
      }))
      );
  }

  private mapPostResponse(postItem: any): Post {
    return {
      id: postItem._id,
      title: postItem.title,
      content: postItem.content,
      imagePath: postItem.imagePath,
      owner: postItem.owner
  }
  }
}
