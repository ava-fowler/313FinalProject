import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth'; // adjust path if needed

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './animal-detail.html',
  styleUrls: ['./animal-detail.css'],
})
export class AnimalDetailComponent {
  animal: any;

  // Role flags
  isLoggedIn = false;
  isCustomer = false;
  isAdmin = false;

  constructor(private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.animal = this.animals.find(a => a.id === id);
  }

  // Temporary: same data as your list (later we move this to a service)
  animals = [
    {
      id: 1,
      name: 'Bella',
      breed: 'Golden Retriever',
      age: 3,
      sex: 'Female',
      description: 'Friendly and energetic, loves people and other dogs.',
      personality: 'Playful, affectionate, loves fetch.',
      shelterDuration: '2 months',
      imageUrl: 'https://placedog.net/500/400?id=3'
    },
    {
      id: 2,
      name: 'Milo',
      breed: 'Tabby Cat',
      age: 2,
      sex: 'Male',
      description: 'Calm, affectionate, and loves naps in sunny spots.',
      personality: 'Quiet, cuddly, loves window watching.',
      shelterDuration: '3 weeks',
      imageUrl: 'https://placedog.net/500/400?id=3'
    },
    {
      id: 3,
      name: 'Luna',
      breed: 'Husky',
      age: 4,
      sex: 'Female',
      description: 'Playful and talkative, enjoys long walks and cold weather.',
      personality: 'Energetic, vocal, very social.',
      shelterDuration: '1 month',
      imageUrl: 'https://placedog.net/500/400?id=3'
    },
    {
      id: 4,
      name: 'Oliver',
      breed: 'Beagle',
      age: 1,
      sex: 'Male',
      description: 'Curious and adventurous, great with families.',
      personality: 'Curious, friendly, loves exploring.',
      shelterDuration: '2 weeks',
      imageUrl: 'https://placedog.net/500/400?id=3'
    },
    {
  id: 5,
  name: 'Daisy',
  breed: 'Corgi',
  age: 2,
  sex: 'Female',
  description: 'Short legs, big personality. Loves belly rubs.',
  personality: 'Playful, loyal, loves attention.',
  shelterDuration: '1 month',
  imageUrl: 'https://placedog.net/500/400?id=3'
},
{
  id: 6,
  name: 'Rocky',
  breed: 'German Shepherd',
  age: 5,
  sex: 'Male',
  description: 'Smart and protective, great with training.',
  personality: 'Alert, confident, very loyal.',
  shelterDuration: '3 months',
  imageUrl: 'https://placedog.net/500/400?id=3'
},
{
  id: 7,
  name: 'Willow',
  breed: 'Calico Cat',
  age: 3,
  sex: 'Female',
  description: 'Independent but affectionate once she trusts you.',
  personality: 'Calm, observant, gentle.',
  shelterDuration: '2 weeks',
  imageUrl: 'https://placedog.net/500/400?id=3'
},
{
  id: 8,
  name: 'Charlie',
  breed: 'Labrador',
  age: 1,
  sex: 'Male',
  description: 'Energetic puppy who loves everyone.',
  personality: 'Friendly, goofy, high-energy.',
  shelterDuration: '5 days',
  imageUrl: 'https://placedog.net/500/400?id=3'
},
{
  id: 9,
  name: 'Hazel',
  breed: 'Border Collie',
  age: 4,
  sex: 'Female',
  description: 'Very intelligent and active, needs mental stimulation.',
  personality: 'Focused, energetic, affectionate.',
  shelterDuration: '1 month',
  imageUrl: 'https://placedog.net/500/400?id=3'
},
{
  id: 10,
  name: 'Finn',
  breed: 'Orange Tabby',
  age: 6,
  sex: 'Male',
  description: 'Lazy king of naps. Loves sunbeams and treats.',
  personality: 'Chill, cuddly, food-motivated.',
  shelterDuration: '4 months',
  imageUrl: 'https://placedog.net/500/400?id=3'
}

  ];
}
