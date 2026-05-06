import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimalService } from '../../services/animal';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminComponent implements OnInit {
  animals$!: Observable<Animal[]>;

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.animals$ = this.animalService.getAnimals();
  }

  async deleteAnimal(id: string | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this animal?')) {
      await this.animalService.deleteAnimal(id);
    }
  }
}
