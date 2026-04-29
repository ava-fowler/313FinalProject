import { firebaseFirestore } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const animals = [
  {
    name: 'Bella',
    breed: 'Golden Retriever',
    age: 3,
    sex: 'Female',
    personality: 'Friendly and energetic, loves people and other dogs.',
    shelterDuration: '2 months',
    imageUrl: 'https://placedog.net/500/400?id=3',
  },
  {
    name: 'Milo',
    breed: 'Tabby Cat',
    age: 2,
    sex: 'Male',
    personality: 'Calm, affectionate, and loves naps in sunny spots.',
    shelterDuration: '3 weeks',
    imageUrl: 'https://placedog.net/500/400?id=3',
  },
  {
    name: 'Luna',
    breed: 'Husky',
    age: 4,
    sex: 'Female',
    personality: 'Playful and talkative, enjoys long walks and cold weather.',
    shelterDuration: '1 month',
    imageUrl: 'https://placedog.net/500/400?id=3',
  },
  {
    name: 'Oliver',
    breed: 'Beagle',
    age: 1,
    sex: 'Male',
    personality: 'Curious and adventurous, great with families.',
    shelterDuration: '2 weeks',
    imageUrl: 'https://placedog.net/500/400?id=3',
  },
  {
    name: 'Daisy',
    breed: 'Corgi',
    age: 2,
    sex: 'Female',
    personality: 'Short legs, big personality. Loves belly rubs.',
    shelterDuration: '1 month',
    imageUrl: 'https://placedog.net/500/400?id=3',
  },
  {
    name: 'Rocky',
    breed: 'German Shepherd',
    age: 5,
    sex: 'Male',
    personality: 'Smart and protective, great with training.',
    shelterDuration: '3 months',
    imageUrl: 'https://placedog.net/500/400?id=3',
  },
  {
    name: 'Willow',
    breed: 'Calico Cat',
    age: 3,
    sex: 'Female',
    personality: 'Independent but affectionate once she trusts you.',
    shelterDuration: '2 weeks',
    imageUrl: 'https://placedog.net/500/400?id=3',
  },
  {
    name: 'Charlie',
    breed: 'Labrador',
    age: 1,
    sex: 'Male',
    personality: 'Energetic puppy who loves everyone.',
    shelterDuration: '5 days',
    imageUrl: 'https://placedog.net/500/400?id=3',
  },
  {
    name: 'Hazel',
    breed: 'Border Collie',
    age: 4,
    sex: 'Female',
    personality: 'Very intelligent and active, needs mental stimulation.',
    shelterDuration: '1 month',
    imageUrl: 'https://placedog.net/500/400?id=3',
  },
  {
    name: 'Finn',
    breed: 'Orange Tabby',
    age: 6,
    sex: 'Male',
    personality: 'Lazy king of naps. Loves sunbeams and treats.',
    shelterDuration: '4 months',
    imageUrl: 'https://placedog.net/500/400?id=3',
  },
];

export async function seedAnimals() {
  const animalsCollection = collection(firebaseFirestore, 'animals');
  for (const animal of animals) {
    await addDoc(animalsCollection, animal);
  }
  console.log('Seeding complete!');
}
