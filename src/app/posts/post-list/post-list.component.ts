import { Component, Input } from '@angular/core';
import { Post } from '../posts.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  @Input() posts: Post[];
}
