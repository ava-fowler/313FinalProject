// import { Injectable, inject } from '@angular/core';
// import { Firestore, doc, setDoc, deleteDoc, docData } from '@angular/fire/firestore';
// import { Auth } from '@angular/fire/auth';
// import { Observable, of } from 'rxjs';


// @Injectable({ providedIn: 'root' })
// export class FavoritesService {
//   getFavoriteIds() {
//     throw new Error('Method not implemented.');
//   }
//   private firestore = inject(Firestore);
//   private auth = inject(Auth);

//   private getUid(): string | null {
//     return this.auth.currentUser?.uid ?? null;
//   }

//   addFavorite(animalId: string): Promise<void> {
//     const uid = this.getUid();
//     if (!uid) return Promise.reject('Not logged in');
//     const ref = doc(this.firestore, `users/${uid}/favorites/${animalId}`);
//     return setDoc(ref, { animalId, savedAt: new Date() });
//   }

//   removeFavorite(animalId: string): Promise<void> {
//     const uid = this.getUid();
//     if (!uid) return Promise.reject('Not logged in');
//     const ref = doc(this.firestore, `users/${uid}/favorites/${animalId}`);
//     return deleteDoc(ref);
//   }

//   isFavorited(animalId: string): Observable<boolean> {
//     const uid = this.getUid();
//     if (!uid) return of(false);
//     const ref = doc(this.firestore, `users/${uid}/favorites/${animalId}`);
//     return new Observable((observer) => {
//       docData(ref).subscribe((data) => observer.next(!!data));
//     });
//   }
// }

import { Injectable } from '@angular/core';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { firebaseFirestore } from '../firebase';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private firestore = firebaseFirestore;

  constructor(private auth: AuthService) {}

  private getEmail(): string | null {
    return this.auth.getCurrentUser()?.email ?? null;
  }

  async getFavoriteIds(): Promise<string[]> {
    const email = this.getEmail();
    if (!email) return [];
    const ref = collection(this.firestore, `favorites`);
    const snapshot = await getDocs(ref);
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }) as any)
      .filter((f) => f.customerEmail === email)
      .map((f) => f.animalId);
  }

  async addFavorite(animalId: string, animalName: string): Promise<void> {
    const email = this.getEmail();
    if (!email) throw new Error('Not logged in');
    const ref = doc(this.firestore, `favorites/${email}_${animalId}`);
    await setDoc(ref, { animalId, animalName, customerEmail: email, savedAt: new Date() });
  }

  async removeFavorite(animalId: string): Promise<void> {
    const email = this.getEmail();
    if (!email) throw new Error('Not logged in');
    const ref = doc(this.firestore, `favorites/${email}_${animalId}`);
    await deleteDoc(ref);
  }

  async isFavorited(animalId: string): Promise<boolean> {
    const ids = await this.getFavoriteIds();
    return ids.includes(animalId);
  }
}
