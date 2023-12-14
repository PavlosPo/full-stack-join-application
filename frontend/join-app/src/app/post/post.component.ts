import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../interfaces/post';
import { AppService } from '../app.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post: Post | undefined;
  @Input() user: User | undefined;

  constructor(private appService: AppService = Inject(AppService)) { }

  // onLikePressed() {
  //   this.appService.likePost(this.post?.id, this.post as Post).subscribe((post: Post) => {
  //     this.post = post;
  //   });
  // }

}

