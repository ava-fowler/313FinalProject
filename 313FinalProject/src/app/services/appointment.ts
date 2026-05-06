import { Injectable } from '@angular/core';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { firebaseFirestore } from '../firebase';
import { AuthService } from './auth';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Appointment {
  id?: string;
  animalId: string | number;
  animalName?: string;
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
    // Real-time listener for all appointments
    const q = query(this.appointmentsCollection, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const appointments = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Appointment);
      this.appointmentsSubject.next(appointments);
    });
  }

  // Your teammate's original method - KEEP THIS
  async createAppointment(animalId: number, date: string, time: string) {
    const user = this.auth.getCurrentUser();
    if (!user) throw new Error('User must be logged in to book an appointment');

    return addDoc(this.appointmentsCollection, {
      animalId,
      customerEmail: user.email,
      date,
      time,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
  }

  // NEW: For the book-appointment component with more fields
  async bookAppointment(appointment: Omit<Appointment, 'id'>): Promise<void> {
    await addDoc(this.appointmentsCollection, {
      ...appointment,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
  }

  // NEW: Get all appointments (real-time via constructor)
  getAppointments(): Observable<Appointment[]> {
    return this.appointments$;
  }

  // NEW: Update status (approve/reject)
  async updateStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
    const appDoc = doc(firebaseFirestore, `appointments/${id}`);
    await updateDoc(appDoc, { status });
  }
}
