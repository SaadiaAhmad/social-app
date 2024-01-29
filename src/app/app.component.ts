import { Component } from '@angular/core';
import { Post } from './posts/posts.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mean-course';
  addedPosts: Post[];

  onPostCreate(post) {
    this.addedPosts.push(post);
  }
}
