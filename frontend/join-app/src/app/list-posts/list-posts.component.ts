import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../interfaces/post';
import { AppService } from '../app.service';
import { PostComponent } from '../post/post.component';
import { User } from '../interfaces/user';
import { PostService } from '../post.service';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css'
})
export class ListPostsComponent implements OnInit {
  posts: Post[] = [];
  @Input() user: User | undefined;  // must come from somewhere else

  constructor(private appService: AppService = Inject(AppService), 
              private postService: PostService = Inject(PostService)) {}

  ngOnInit(): void {

    // Fetch the posts from the server
    this.appService.request(
      "GET",
      "/posts",
      {}).then(
        (response) => {
          this.posts = [...response.data, ...this.posts]; // Merge the fetched posts with the existing posts

        }).catch(
          (error) => {
            if (error.response.status === 401) {
              // Handle 401 Unauthorized (e.g., redirect to login page)
              this.appService.setAuthToken(null);
              // You might want to redirect to the login page here
            } else {
              console.error('Error fetching posts:', error);
              // Handle other errors as needed
            }
          }
        )

        this.postService.latestPost$.subscribe((post) => {
          if (post) {
            this.posts.unshift(post); // Add the new post at the beginning of the array
          }
        });
      
    }
  }

