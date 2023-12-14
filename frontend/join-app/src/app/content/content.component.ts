import { Component, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { WelcomeContentComponent } from '../welcome-content/welcome-content.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthContentComponent } from '../auth-content/auth-content.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import { ListPostsComponent } from '../list-posts/list-posts.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { ProfileComponent } from '../profile/profile.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
// import { AuthService } from '../auth.service';

@Component({
    selector: 'app-content',
    standalone: true,
    templateUrl: './content.component.html',
    styleUrl: './content.component.css',
    imports: [CommonModule, WelcomeContentComponent, LoginFormComponent,
        AuthContentComponent, ButtonsComponent, ListPostsComponent,
        CreatePostComponent, ProfileComponent, ErrorMessageComponent, EditProfileComponent]
})
export class ContentComponent implements OnInit {

  componentToShow: string = '';
  currentUser: User | null = this.appService.getUser()
  errorMessage: string = '';
  isLoggedIn: boolean = this.currentUser != null;


  constructor(protected appService: AppService = Inject(AppService)) { }

  ngOnInit(): void {
    this.appService.getUserAsync().then((user) => {
      this.currentUser = user;
      this.isLoggedIn = user !== null;
      if (this.isLoggedIn) {
        this.showComponent("isLoggedIn");
      } else {
        this.showComponent("welcome");
      }
    });
  }
  
  

  onLogin(input: any): void {
    this.appService.request(
      "POST",
      "/login",
      {
        username: input.username,
        password: input.password
      }).then(
        response => {
          this.appService.setAuthToken(response.data.token);
          this.appService.login(response.data);
          this.currentUser = response.data.user;
          this.isLoggedIn = true;
          this.showComponent("isLoggedIn");
        }).catch(
          error => {
              if (error.response.status == 404) {
                this.errorMessage = 'This user is not registered. Please register in.';
              } else if (error.response.status == 400) {
                console.log(error.response.status)
                this.errorMessage = 'Invalid password. Please try again.';
              } else {
                console.log(error.response.status)
                this.errorMessage = 'An error occurred. Please try again.';
              }
          }
      );
    }

    // onRegister(input: any) :void {
    //   this.appService.request(
    //     "POST",
    //     "/register",
    //     {
    //       firstname: input.firstname,
    //       lastname: input.lastname,
    //       username: input.username,
    //       password: input.password,
    //       email: input.email
    //     }).then(
    //       response => {
    //         this.appService.setAuthToken(response.data.token);
    //         this.appService.login(response.data);
    //         this.isLoggedIn = true;
    //         this.currentUser = this.appService.getUser()
    //         this.showComponent("isLoggedIn");
    //       }
    //     ).catch(
    //       error => {
    //           // Check the error message
    //           if (error.response.status == 400) {
    //             // Display a specific error message
    //             this.errorMessage = 'This username is already registered. Please log in or use a different username.';
    //           } else {
    //             // Display a generic error message
    //             this.errorMessage = 'An error occurred. Please try again.';
    //           }
    //         this.appService.setAuthToken(null)
    //         this.appService.logout()
    //       }
    //     )
    // }
    onRegister(input: any): void {
      this.appService.request("POST", "/register", {
        firstname: input.firstname,
        lastname: input.lastname,
        username: input.username,
        password: input.password,
        email: input.email
      }).then(response => {
          this.appService.setAuthToken(response.data.token);
          this.appService.login(response.data);
          this.isLoggedIn = true;
          // Remove the next line if setting currentUser again is unnecessary
          this.currentUser = this.appService.getUser();
          this.showComponent("isLoggedIn");
        })
        .catch(error => {
          this.errorMessage = (error.response.status === 400) ?
            'This username is already registered. Please log in or use a different username.' :
            'An error occurred. Please try again.';
          this.appService.setAuthToken(null);
          this.appService.logout();
        });
    }
    

    onLogout(): void {
      this.errorMessage = '';
      this.appService.setAuthToken(null);
      this.currentUser = null;
      this.appService.logout();
      this.isLoggedIn = false;
      this.showComponent("welcome");
    }
    

    showComponent(componentToShow: string): void {
      this.componentToShow = componentToShow;
      this.errorMessage = '';
    }

    handleError(error: any): void {
      if (error.response.status === 400) {
        this.errorMessage = 'Specific error message for status 400.';
      } else {
        this.errorMessage = 'Generic error message.';
      }
      this.appService.setAuthToken(null);
      this.appService.logout();
    }
    
}
