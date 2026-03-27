import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-animal-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-profile.html',
  styleUrls: ['./animal-profile.css'],
})
export class AnimalProfileComponent {
  @Input() animal: any;

  @Output() selected = new EventEmitter<any>();

  constructor(private auth: AuthService) {}

  get userRole() {
    return this.auth.getCurrentUser()?.role ?? null;
  }

  onSelect() {
    this.selected.emit(this.animal);
  }
}