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
  where,
  getDocs,
} from 'firebase/firestore';
import { firebaseFirestore } from '../firebase';
import { AuthService } from './auth';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Appointment {
  id?: string;
  animalId: string;
  animalName: string;
  customerEmail: string;
  customerName?: string;
  date: string;
  time: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
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
      animalId,
      animalName,
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

  async getAppointmentsByEmail(email: string): Promise<Appointment[]> {
    const q = query(this.appointmentsCollection, where('customerEmail', '==', email));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Appointment);
  }

  async updateStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
    const appDoc = doc(firebaseFirestore, `appointments/${id}`);
    await updateDoc(appDoc, { status });
  }

  async cancelAppointment(appointmentId: string): Promise<void> {
    const apptDoc = doc(firebaseFirestore, `appointments/${appointmentId}`);
    await updateDoc(apptDoc, { status: 'cancelled' });
  }

  async deleteAppointment(id: string): Promise<void> {
    const appDoc = doc(firebaseFirestore, `appointments/${id}`);
    await deleteDoc(appDoc);
  }
}
