import { Component, Input } from '@angular/core';
import { Post } from '../posts.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  // posts = [
  //   {
  //     title: 'First Post',
  //     content: 'First Post Content'
  //   },
  //   {
  //     title: 'Second Post',
  //     content: 'Second Post Content'
  //   },
  //   {
  //     title: 'Third Post',
  //     content: 'Third Post Content'
  //   }
  // ];

  @Input() posts: Post[];
}
