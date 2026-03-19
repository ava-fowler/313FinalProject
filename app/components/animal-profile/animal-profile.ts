import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal-profile.html',
  styleUrls: ['./animal-profile.css'],
})
export class AnimalProfileComponent {
  @Input() animal: any;
  @Input() role?: 'admin' | 'customer' | 'guest';

  @Output() selected = new EventEmitter<any>();

  onSelect() {
    this.selected.emit(this.animal);
  }
}
