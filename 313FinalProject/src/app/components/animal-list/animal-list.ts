import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimalProfileComponent } from '../animal-profile/animal-profile';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalService } from '../../services/animal';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, AnimalProfileComponent, FormsModule],
  templateUrl: './animal-list.html',
  styleUrls: ['./animal-list.css'],
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];
  filteredAnimals: Animal[] = [];

  // Filter values
  searchQuery = '';
  selectedSex = '';
  selectedAge = '';
  selectedDuration = '';

  constructor(
    private router: Router,
    private animalService: AnimalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.animalService.getAnimals().subscribe(animals => {
      this.animals = animals;
      this.filteredAnimals = animals;
      this.cdr.detectChanges();
    });
  }

  applyFilters() {
    this.filteredAnimals = this.animals.filter(animal => {

      // Name or breed search
      const query = this.searchQuery.toLowerCase();
      const matchesSearch = !query ||
        animal.name.toLowerCase().includes(query) ||
        animal.breed.toLowerCase().includes(query);

      // Sex filter
      const matchesSex = !this.selectedSex ||
        animal.sex.toLowerCase() === this.selectedSex.toLowerCase();

      // Age filter
      const matchesAge = !this.selectedAge || (animal.age != null && this.filterByAge(animal.age));

      // Duration filter
      const matchesDuration = !this.selectedDuration || (animal.shelterDuration && this.filterByDuration(animal.shelterDuration));

      return matchesSearch && matchesSex && matchesAge && matchesDuration;
    });

    this.cdr.detectChanges();
  }

  filterByAge(age: string | number): boolean {
    const numAge = typeof age === 'string' ? parseInt(age, 10) : age;
    switch (this.selectedAge) {
      case 'young': return numAge <= 2;
      case 'adult': return numAge >= 3 && numAge <= 7;
      case 'senior': return numAge >= 8;
      default: return true;
    }
  }

  filterByDuration(duration: string): boolean {
    const d = duration.toLowerCase();
    switch (this.selectedDuration) {
      case 'recent':
        return d.includes('day') || d.includes('week');
      case 'medium':
        return d.includes('1 month') || d.includes('2 month') || d.includes('3 month');
      case 'long':
        return d.includes('4 month') || d.includes('5 month') ||
               d.includes('6 month') || d.includes('year');
      default:
        return true;
    }
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedSex = '';
    this.selectedAge = '';
    this.selectedDuration = '';
    this.filteredAnimals = this.animals;
    this.cdr.detectChanges();
  }

  openAnimal(animal: Animal) {
    this.router.navigate(['/animals', animal.id]);
  }
}