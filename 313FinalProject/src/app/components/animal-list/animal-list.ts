import { Component } from '@angular/core';
import { AnimalProfileComponent } from '../animal-profile/animal-profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, AnimalProfileComponent],
  templateUrl: './animal-list.html',
  styleUrls: ['./animal-list.css'],
})
export class AnimalListComponent {
animals = [
  {
    id: 1,
    name: 'Bella',
    breed: 'Golden Retriever',
    age: 3,
    description: 'Friendly and energetic, loves people and other dogs.',
    imageUrl: 'https://placedog.net/500/400?id=1'
  },
  {
    id: 2,
    name: 'Milo',
    breed: 'Tabby Cat',
    age: 2,
    description: 'Calm, affectionate, and loves naps in sunny spots.',
    imageUrl: 'https://placekitten.com/500/400'
  },
  {
    id: 3,
    name: 'Luna',
    breed: 'Husky',
    age: 4,
    description: 'Playful and talkative, enjoys long walks and cold weather.',
    imageUrl: 'https://placedog.net/500/400?id=3'
  },
  {
    id: 4,
    name: 'Oliver',
    breed: 'Beagle',
    age: 1,
    description: 'Curious and adventurous, great with families.',
    imageUrl: 'https://placedog.net/500/400?id=4'
  }
];

}
