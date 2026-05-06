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

  // Properties the template needs
  date: string = '';
  time: string = '';

  officeHours = {
    open: '9:00am',
    close: '10:00pm',
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

  async book() {
    if (!this.date || !this.time) {
      alert('Please select both date and time');
      return;
    }

    try {
      await this.appointmentService.createAppointment(Number(this.animalId), this.date, this.time);
      alert('Appointment requested! Waiting for admin approval.');
      this.router.navigate(['/home']);
    } catch (error: any) {
      alert(error.message || 'Failed to book appointment');
    }
  }
}
