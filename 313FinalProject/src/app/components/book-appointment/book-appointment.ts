import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment';
import { AnimalService } from '../../services/animal';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-appointment.html',
})
export class BookAppointmentComponent implements OnInit {
  animalId = '';
  animalName = '';
  name = '';
  date = '';
  time = '';

  officeHours = {
    open: '09:00',
    close: '19:00',
  };

  officeHoursDisplay = {
    open: '9:00 AM',
    close: '7:00 PM',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private animalService: AnimalService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    console.debug('BookAppointment: route id', id);
    this.animalId = id;
    if (id) {
      this.animalService.getAnimalById(id).subscribe({
        next: (a) => {
          console.debug('BookAppointment: fetched animal', id, a);
          this.animalName = a?.name || 'Unknown Animal';
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.warn('BookAppointment: failed to fetch animal', id, err);
          this.animalName = 'Unknown Animal';
          this.cdr.detectChanges();
        },
      });
    }
  }

  private formatDateDisplay(isoDate: string): string {
    const [year, month, day] = isoDate.split('-');
    return `${Number(month)}/${Number(day)}/${year}`;
  }

  private formatTimeDisplay(time24: string): string {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }

  async book() {
    const customerName = this.name.trim();

    if (!customerName) {
      alert('Please enter your name');
      return;
    }
    if (!this.date || !this.time) {
      alert('Please select both date and time');
      return;
    }

    try {
      await this.appointmentService.createAppointment(
        this.animalId,
        this.animalName || this.animalId,
        customerName,
        this.date,
        this.time,
      );

      const formattedDate = this.formatDateDisplay(this.date);
      const formattedTime = this.formatTimeDisplay(this.time);

      alert(
        `${customerName} you have made an appointment for ${formattedDate} at ${formattedTime}`,
      );
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Booking failed:', error);
      alert(error.message || 'Failed to book appointment');
    }
  }
}
