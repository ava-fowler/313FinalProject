import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-appointment.html',
  styleUrls: ['./book-appointment.css'],
})
export class BookAppointmentComponent {
  animalId!: number;
  date = '';
  time = '';

  officeHours = {
    open: '09:00',
    close: '17:00'
  };

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    this.animalId = Number(this.route.snapshot.paramMap.get('id'));
  }

  async book() {
  if (!this.date) {
    alert('Please select a date.');
    return;
  }

  if (!this.time) {
    alert('Please select a time.');
    return;
  }

  // Build selected date in LOCAL time (no UTC parsing issues)
  const [year, month, day] = this.date.split('-').map(Number);
  const [hour, minute] = this.time.split(':').map(Number);

  const selectedDateOnly = new Date(year, month - 1, day);
  selectedDateOnly.setHours(0, 0, 0, 0);

  const selectedDateTime = new Date(year, month - 1, day, hour, minute, 0, 0);

  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Rule 1: Block past dates
  if (selectedDateOnly < today) {
    alert('You cannot book an appointment in the past.');
    return;
  }

  // Rule 2: Enforce office hours BEFORE same-day logic
  if (this.time < this.officeHours.open || this.time > this.officeHours.close) {
    alert(`Please choose a time between ${this.officeHours.open} and ${this.officeHours.close}.`);
    return;
  }

  // Rule 3: If booking today, enforce 1-hour buffer
  const isToday = selectedDateOnly.getTime() === today.getTime();
  if (isToday) {
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    if (selectedDateTime < oneHourFromNow) {
      alert('Same-day appointments must be at least 1 hour from now.');
      return;
    }
  }

  try {
    await this.appointmentService.createAppointment(
      this.animalId,
      this.date,
      this.time
    );

    alert('Appointment request sent! Pending admin approval.');
    this.router.navigate(['/customer-profile']);
  } catch (error) {
    alert('Error booking appointment: ' + (error as any).message);
  }
}

}
