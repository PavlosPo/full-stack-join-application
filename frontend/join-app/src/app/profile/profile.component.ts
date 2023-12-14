import { Component, Inject, Input, Output } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { User } from '../interfaces/user';
import { AppService } from '../app.service';
import { constrainedMemory } from 'process';
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { SuccessMessageComponent } from '../success-message/success-message.component';
import { ErrorMessageComponent } from "../error-message/error-message.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [CommonModule, EditProfileComponent, SuccessMessageComponent, ErrorMessageComponent]
})
export class ProfileComponent {
  @Input() currentUser: User | null = this.appService.getUser();
  @Output() componentToShow: string | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private appService: AppService = Inject(AppService) ) {}

  showComponentToEditProfile() {
    this.componentToShow = "editProfile";
  }

  handleSuccessMessage($event: any) {
    this.componentToShow = "successMessage";
    this.successMessage = $event;
  }

  handleErrorMessage($event: any) {
    this.componentToShow = "errorMessage";
    this.errorMessage = $event;
  }
  
}
