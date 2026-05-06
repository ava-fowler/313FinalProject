import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AnimalService } from '../../services/animal';
import { Animal } from '../../models/animal';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './animal-detail.html',
  styleUrls: ['./animal-detail.css'],
})
export class AnimalDetailComponent implements OnInit {
  animal!: Animal;

  isLoggedIn = false;
  isCustomer = false;
  isAdmin = false;
  isFavorited = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private animalService: AnimalService,
    private cdr: ChangeDetectorRef,
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isCustomer = this.auth.isCustomer();
    this.isAdmin = this.auth.isAdmin();

    const id = this.route.snapshot.paramMap.get('id');
    console.log('Route ID:', id);
    if (id) {
      this.animalService.getAnimalById(id).subscribe((animal) => {
        console.log('Animal returned:', animal);
        if (!animal) {
          console.log('Animal came back null');
          return;
        }
        this.animal = animal;

       this.favoritesService.isFavorited(this.animal.id).then((val) => {
         this.isFavorited = val;
         this.cdr.detectChanges();
       });
        this.cdr.detectChanges();
      });
    }
  }
  toggleFavorite() {
    console.log('toggleFavorite called, isFavorited:', this.isFavorited); // 👈 add this
    if (this.isFavorited) {
      this.favoritesService
        .removeFavorite(this.animal.id)
        .then(() => {
          this.isFavorited = false;
          this.cdr.detectChanges();
        })
        .catch((err) => console.error('removeFavorite error:', err)); // 👈 and this
    } else {
      this.favoritesService
        .addFavorite(this.animal.id, this.animal.name)
        .then(() => {
          this.isFavorited = true;
          this.cdr.detectChanges();
        })
        .catch((err) => console.error('addFavorite error:', err)); // 👈 and this
    }
  }
}