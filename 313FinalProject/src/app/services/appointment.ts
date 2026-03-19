import { Injectable } from '@angular/core';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firebaseFirestore } from '../firebase';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private firestore = firebaseFirestore;

  constructor(private auth: AuthService) {}
  async createAppointment(animalId: number, date: string, time: string) {
    const user = this.auth.getCurrentUser();
    if (!user) throw new Error('User must be logged in to book an appointment');

    const appointmentsRef = collection(this.firestore, 'appointments');

    return addDoc(appointmentsRef, {
      animalId,
      customerEmail: user.email,
      date,
      time,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  }
}
