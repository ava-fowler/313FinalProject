import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { firebaseFirestore } from '../firebase';
import { Observable, from, map } from 'rxjs';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private animalsCollection = collection(firebaseFirestore, 'animals');

  // ----------------------
  // Get all animals
  // ----------------------
  getAnimals(): Observable<Animal[]> {
    return from(getDocs(this.animalsCollection)).pipe(
      map(snapshot => snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Animal)))
    );
  }

  // ----------------------
  // Get single animal by ID
  // ----------------------
  getAnimalById(id: string): Observable<Animal | null> {
    const animalDoc = doc(firebaseFirestore, `animals/${id}`);
    return from(getDoc(animalDoc)).pipe(
      map((d) => {
        if (!d.exists()) {
          console.log('No animal found for id:', id); // helps confirm the problem
          return null;
        }
        return { id: d.id, ...d.data() } as Animal;
      }),
    );
  }

  // ----------------------
  // Add new animal
  // ----------------------
  addAnimal(animal: Animal): Promise<void> {
    return addDoc(this.animalsCollection, animal).then(() => {});
  }

  // ----------------------
  // Update animal
  // ----------------------
  updateAnimal(id: string, animal: Partial<Animal>): Promise<void> {
    const animalDoc = doc(firebaseFirestore, `animals/${id}`);
    return updateDoc(animalDoc, animal);
  }

  // ----------------------
  // Delete animal
  // ----------------------
  deleteAnimal(id: string): Promise<void> {
    const animalDoc = doc(firebaseFirestore, `animals/${id}`);
    return deleteDoc(animalDoc);
  }
}