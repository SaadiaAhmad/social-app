import { Component } from '@angular/core';
import { Post } from './posts/posts.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  addedPosts: Post[] = [];

  onPostCreate(post) {
    this.addedPosts.push(post);
  }

  onResetPosts() {
    this.addedPosts = [];
    this.addedPosts.length = 0;
    
    console.log(this.addedPosts, this.addedPosts.length);
  }
}
