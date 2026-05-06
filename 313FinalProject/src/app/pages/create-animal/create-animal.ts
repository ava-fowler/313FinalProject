import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../services/animal';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-create-animal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-animal.html',
  styleUrls: ['./create-animal.css'],
})
export class CreateAnimalComponent implements OnInit {
  newAnimal: Partial<Animal> = {
    name: '',
    breed: '',
    sex: '',
    species: '',
    age: '',
    about: '',
    status: 'Available',
    imageUrl: '',
  };

  isEditMode = false;
  animalId: string | null = null;

  constructor(
    private animalService: AnimalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.animalId = this.route.snapshot.paramMap.get('id');
    if (this.animalId) {
      this.isEditMode = true;
      this.animalService.getAnimalById(this.animalId).subscribe((animal) => {
        this.newAnimal = { ...animal };
      });
    }
  }

  async createAnimal() {
    if (!this.newAnimal.name || !this.newAnimal.breed || !this.newAnimal.sex) {
      alert('Please fill in required fields (Name, Breed, Sex)');
      return;
    }

    if (this.isEditMode && this.animalId) {
      await this.animalService.updateAnimal(this.animalId, this.newAnimal);
      alert('Animal updated successfully!');
    } else {
      await this.animalService.addAnimal(this.newAnimal as Animal);
      alert('Animal created successfully!');
    }

    this.router.navigate(['/admin']);
  }
}
