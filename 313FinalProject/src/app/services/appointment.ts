import { Injectable } from '@angular/core';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { firebaseFirestore } from '../firebase';
import { AuthService } from './auth';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Appointment {
  id?: string;
  animalId: string; // Changed to string to match Firestore IDs
  animalName: string; // NEW: Store the animal's name
  customerEmail: string;
  customerName?: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  createdAt?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsCollection = collection(firebaseFirestore, 'appointments');
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  appointments$ = this.appointmentsSubject.asObservable();

  constructor(private auth: AuthService) {
    const q = query(this.appointmentsCollection, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const appointments = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Appointment);
      this.appointmentsSubject.next(appointments);
    });
  }

  // UPDATED: Accept animalId as string and add animalName
  async createAppointment(
    animalId: string,
    animalName: string,
    customerName: string,
    date: string,
    time: string,
  ) {
    const user = this.auth.getCurrentUser();
    if (!user) throw new Error('User must be logged in to book an appointment');

    return addDoc(this.appointmentsCollection, {
      animalId, // Now saved as string (no NaN)
      animalName, // NEW: Saves the animal's name
      customerName,
      customerEmail: user.email,
      date,
      time,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
  }

  async bookAppointment(appointment: Omit<Appointment, 'id'>): Promise<void> {
    await addDoc(this.appointmentsCollection, {
      ...appointment,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
  }

  getAppointments(): Observable<Appointment[]> {
    return this.appointments$;
  }

  async updateStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
    const appDoc = doc(firebaseFirestore, `appointments/${id}`);
    await updateDoc(appDoc, { status });
  }

  async deleteAppointment(id: string): Promise<void> {
    const appDoc = doc(firebaseFirestore, `appointments/${id}`);
    await deleteDoc(appDoc);
  }
}
