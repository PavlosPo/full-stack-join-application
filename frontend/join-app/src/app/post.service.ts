// post.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from './interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _latestPost = new BehaviorSubject<Post | null>(null);
  latestPost$ = this._latestPost.asObservable();

  updateLatestPost(post: Post) {
    this._latestPost.next(post);
  }
}