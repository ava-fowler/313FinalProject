import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AnimalService } from '../../services/animal';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './animal-detail.html',
  styleUrls: ['./animal-detail.css'],
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal | null = null;

  isLoggedIn = false;
  isCustomer = false;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private animalService: AnimalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isCustomer = this.auth.isCustomer();
    this.isAdmin = this.auth.isAdmin();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.animalService.getAnimalById(id).subscribe(animal => {
        this.animal = animal;
        this.cdr.detectChanges();
      });
    }
  }
}