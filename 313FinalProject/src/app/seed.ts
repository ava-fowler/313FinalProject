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
    imageUrl: 'src/assets/images/golden retreiver.jpg',
  },
  {
    name: 'Milo',
    breed: 'Tabby Cat',
    age: 2,
    sex: 'Male',
    personality: 'Calm, affectionate, and loves naps in sunny spots.',
    shelterDuration: '3 weeks',
    imageUrl: 'src/assets/images/tabby.jpg',
  },
  {
    name: 'Luna',
    breed: 'Husky',
    age: 4,
    sex: 'Female',
    personality: 'Playful and talkative, enjoys long walks and cold weather.',
    shelterDuration: '1 month',
    imageUrl: 'src/assets/images/husky.jpg',
  },
  {
    name: 'Oliver',
    breed: 'Beagle',
    age: 1,
    sex: 'Male',
    personality: 'Curious and adventurous, great with families.',
    shelterDuration: '2 weeks',
    imageUrl: 'src/assets/images/beagle.jpg',
  },
  {
    name: 'Daisy',
    breed: 'Corgi',
    age: 2,
    sex: 'Female',
    personality: 'Short legs, big personality. Loves belly rubs.',
    shelterDuration: '1 month',
    imageUrl: 'src/assets/images/corgi.jpg',
  },
  {
    name: 'Rocky',
    breed: 'German Shepherd',
    age: 5,
    sex: 'Male',
    personality: 'Smart and protective, great with training.',
    shelterDuration: '3 months',
    imageUrl: 'src/assets/images/german shepard.jpg',
  },
  {
    name: 'Willow',
    breed: 'Calico Cat',
    age: 3,
    sex: 'Female',
    personality: 'Independent but affectionate once she trusts you.',
    shelterDuration: '2 weeks',
    imageUrl: 'src/assets/images/calico.jpg',
  },
  {
    name: 'Charlie',
    breed: 'Chocolate Labrador',
    age: 1,
    sex: 'Male',
    personality: 'Energetic puppy who loves everyone.',
    shelterDuration: '5 days',
    imageUrl: 'src/assets/images/chocolate lab.jpg',
  },
  {
    name: 'Hazel',
    breed: 'Border Collie',
    age: 4,
    sex: 'Female',
    personality: 'Very intelligent and active, needs mental stimulation.',
    shelterDuration: '1 month',
    imageUrl: 'src/assets/images/border collie.jpg',
  },
  {
    name: 'Finn',
    breed: 'Orange Tabby',
    age: 6,
    sex: 'Male',
    personality: 'Lazy king of naps. Loves sunbeams and treats.',
    shelterDuration: '4 months',
    imageUrl: 'src/assets/images/orange tabby.jpg',
  },
];

export async function seedAnimals() {
  const animalsCollection = collection(firebaseFirestore, 'animals');
  for (const animal of animals) {
    await addDoc(animalsCollection, animal);
  }
  console.log('Seeding complete!');
}
