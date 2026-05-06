import { Component } from '@angular/core';
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
export class BookAppointmentComponent {
  animalId: string = '';
  animalName: string = '';

  name: string = '';
  date: string = '';
  time: string = '';

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
  ) {}

  ngOnInit() {
    this.animalId = this.route.snapshot.paramMap.get('id') || '';
    this.animalService.getAnimalById(this.animalId).subscribe((animal) => {
      this.animalName = animal.name;
    });
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
      // Pass animalId as string (not Number), and include animalName
      await this.appointmentService.createAppointment(
        this.animalId, // Keep as string
        this.animalName, // Pass the animal's name
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
