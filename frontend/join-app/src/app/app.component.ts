import { Component, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PostComponent } from './post/post.component'; 
import { ListPostsComponent } from './list-posts/list-posts.component';
import { HttpClientModule } from '@angular/common/http';
import { CreatePostComponent } from './create-post/create-post.component';
import { AppService } from './app.service';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PostComponent, ListPostsComponent, HttpClientModule, CreatePostComponent, HeaderComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AppService]
})
export class AppComponent{
  title = 'join-app';
  
}
