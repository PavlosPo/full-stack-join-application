import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-auth-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-content.component.html',
  styleUrl: './auth-content.component.css'
})
export class AuthContentComponent {
  data: Post[] = [];

  constructor(private appService : AppService = Inject(AppService)) { }

  ngOnInit(): void {
    this.appService.request(
      "GET",
      "/posts",
      {}).then(
        (response) => {
          this.data = response.data;
        }).catch(
          (error) => {
            if (error.response.status === 401) {
              this.appService.setAuthToken(null);
            } else {
              console.error('Error fetching posts:', error);
            }
          }
        )
  }
}
