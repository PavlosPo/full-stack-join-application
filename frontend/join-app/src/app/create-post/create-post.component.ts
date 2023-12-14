import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { Post } from '../interfaces/post';
import { User } from '../interfaces/user';
import { FormsModule } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit{
  postContent: string = '';
  user : User | null = this.appService.getUser(); 

  constructor(private appService: AppService = Inject(AppService), private postService: PostService = Inject(PostService)) { }

  onPost() {
    // Handle the post submission here
    const post: Post = {
      content: this.postContent,
      userCreated: this.appService.getUser() as User,
      createdDate: undefined as unknown as Date,
    };
    
    console.log('postContent', this.postContent);
    console.log(post)

    this.appService.request('POST', '/posts', post)
      .then((response) => {
        console.log('post', response.data);
        this.postContent = ''; // Clear the post content after submitting
        this.postService.updateLatestPost(response.data); // Update the latest post
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        // Handle errors as needed
      });
  }

  ngOnInit(): void {
    this.postService.latestPost$.subscribe((post) => {
      if (post) {
        this.postContent = post.content;
      }
    });
  }
}
