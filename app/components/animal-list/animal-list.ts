import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimalProfileComponent } from '../animal-profile/animal-profile';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnimalService } from '../../services/animal';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, AnimalProfileComponent],
  templateUrl: './animal-list.html',
  styleUrls: ['./animal-list.css'],
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];

  constructor(
    private router: Router,
    private animalService: AnimalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.animalService.getAnimals().subscribe(animals => {
      this.animals = animals;
      this.cdr.detectChanges();
    });
  }

  openAnimal(animal: Animal) {
    this.router.navigate(['/animals', animal.id]);
  }
}