import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  

  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

	active: string = "login";
  firstname: string = "";
  lastname: string = "";
  username: string = "";
  password: string = "";
  email: string = "";

	onLoginTab(): void {
		this.active = "login";
	}

	onRegisterTab(): void {
		this.active = "register";
	}

  onSubmitLogin(): void {
    this.onSubmitLoginEvent.emit({"username": this.username, "password": this.password});
  }

  onSubmitRegister(): void {
    this.onSubmitRegisterEvent.emit({
      "firstname": this.firstname, 
      "lastname": this.lastname, 
      "username": this.username, 
      "password": this.password,
      "email": this.email});
  }
}
