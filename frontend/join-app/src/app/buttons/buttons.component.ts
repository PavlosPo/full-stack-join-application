import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Output() loginEvent = new EventEmitter();
  @Output() logoutEvent = new EventEmitter();
  @Input() isLoggedIn: boolean = false;

}
