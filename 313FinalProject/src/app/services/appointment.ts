import { Injectable } from '@angular/core';
import { collection, addDoc, serverTimestamp, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { firebaseFirestore } from '../firebase';
import { AuthService } from './auth';

interface Appointment {
  id?: string;
  animalId: string;
  animalName?: string;
  customerEmail: string;
  date: string;
  time: string;
  status: string;
  createdAt?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private firestore = firebaseFirestore;

  constructor(private auth: AuthService) {}
  
  async createAppointment(animalId: string, animalName: string, date: string, time: string) {
    const user = this.auth.getCurrentUser();
    if (!user) throw new Error('User must be logged in to book an appointment');

    const appointmentsRef = collection(this.firestore, 'appointments');

    return addDoc(appointmentsRef, {
      animalId,
      animalName,
      customerEmail: user.email,
      date,
      time,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  }

  async cancelAppointment(appointmentId: string): Promise<void> {
    const apptDoc = doc(this.firestore, `appointments/${appointmentId}`);
    await updateDoc(apptDoc, { status: 'cancelled' });
  }

  async getAppointmentsByEmail(email: string): Promise<Appointment[]> {
    const appointmentsRef = collection(this.firestore, 'appointments');
    const q = query(appointmentsRef, where('customerEmail', '==', email));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Appointment));
  }
}
