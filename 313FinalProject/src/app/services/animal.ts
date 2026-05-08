import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { firebaseFirestore, firebaseStorage } from '../firebase';
import { Observable, from, map, BehaviorSubject } from 'rxjs';
import { Animal } from '../models/animal';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private animalsCollection = collection(firebaseFirestore, 'animals');
  private animalsSubject = new BehaviorSubject<Animal[]>([]);
  animals$ = this.animalsSubject.asObservable();

  constructor() {
    const q = query(this.animalsCollection, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const animals = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Animal);
      this.animalsSubject.next(animals);
    });
  }

  getAnimals(): Observable<Animal[]> {
    return this.animals$;
  }

  getAnimalById(id: string): Observable<Animal | null> {
    const animalDoc = doc(firebaseFirestore, `animals/${id}`);
    return from(getDoc(animalDoc)).pipe(
      map((d) => {
        if (!d.exists()) {
          console.log('No animal found for id:', id);
          return null;
        }
        return { id: d.id, ...(d.data() || {}) } as Animal;
      }),
    );
  }

  addAnimal(animal: Animal): Promise<void> {
    return addDoc(this.animalsCollection, {
      ...animal,
      createdAt: new Date(),
    }).then(() => {});
  }

  updateAnimal(id: string, animal: Partial<Animal>): Promise<void> {
    const animalDoc = doc(firebaseFirestore, `animals/${id}`);
    return updateDoc(animalDoc, animal);
  }

  deleteAnimal(id: string): Promise<void> {
    const animalDoc = doc(firebaseFirestore, `animals/${id}`);
    return deleteDoc(animalDoc);
  }

  async uploadImage(file: File): Promise<string> {
    const storageRef = ref(firebaseStorage, `animal-images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
}
