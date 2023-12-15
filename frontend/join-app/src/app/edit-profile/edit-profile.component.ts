import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  @Output() successMessage = new EventEmitter<string>();
  @Output() errorMessage = new EventEmitter<string>();
  user: User = this.appService.getUser() as User;

  constructor(private appService: AppService = Inject(AppService)) {}

  onSubmit(input: any) {
    const payload: any = { 
      id: this.user?.id,
      firstname: this.user.firstname,
      password: this.user.password,
      lastname: this.user.lastname,
      username: this.user.username,
      email: this.user.email
    };
  
    // Check each field and add it to the payload if it is not null or undefined
    payload.firstname = input.firstname ?? payload.firstname;
    payload.lastname = input.lastname ?? payload.lastname;
    payload.username = input.username ?? payload.username;
    payload.password = input.password ?? payload.password;
    payload.email = input.email ?? payload.email;

    this.appService.request("PATCH", "/users/" + this.user.id, payload)
    .then(response => {
      this.appService.setUser(response.data);
      console.log(response.data);
      this.successMessage.emit('Profile updated successfully'); // Show a success message
    })
    .catch(error => {
      console.log(error.response.status);
      console.log(payload);
      this.errorMessage.emit('An error occurred. Please try again.');
    });
  }

//   onSubmit(input: any) {
//     const updatedData: any = {
//         id: this.user?.id,
//         firstname: input.firstname,
//         lastname: input.lastname,
//         password: input.password,
//         email: input.email
//     };

//     this.appService.request("PATCH", "/users/" + this.user.id, updatedData)
//         .then(response => {
//             this.appService.setUser(response.data);
//             this.appService.login(response.data);
//             console.log(response.data);
//             this.successMessage.emit('Profile updated successfully');
//         })
//         .catch(error => {
//             console.error(error.response.status);
//             this.errorMessage.emit('An error occurred. Please try again.');
//         });
// }

}
