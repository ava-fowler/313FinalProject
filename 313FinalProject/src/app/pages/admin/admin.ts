import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimalService } from '../../services/animal';
import { Animal } from '../../models/animal';
import { AppointmentService, Appointment } from '../../services/appointment';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminComponent implements OnInit {
  animals$!: Observable<Animal[]>;
  appointments$!: Observable<Appointment[]>;

  constructor(
    private animalService: AnimalService,
    private appointmentService: AppointmentService,
  ) {
    this.appointments$ = this.appointmentService.appointments$;
  }

  ngOnInit() {
    this.animals$ = this.animalService.getAnimals();
  }

  async deleteAnimal(id: string | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this animal?')) {
      await this.animalService.deleteAnimal(id);
    }
  }

  async approveAppointment(id: string | undefined) {
    if (!id) return;
    try {
      await this.appointmentService.updateStatus(id, 'approved');
    } catch (error: any) {
      alert(error.message || 'Failed to approve appointment');
    }
  }

  async rejectAppointment(id: string | undefined) {
    if (!id) return;
    try {
      await this.appointmentService.updateStatus(id, 'rejected');
    } catch (error: any) {
      alert(error.message || 'Failed to reject appointment');
    }
  }

  async deleteAppointment(id: string | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this appointment?')) {
      try {
        await this.appointmentService.deleteAppointment(id);
      } catch (error: any) {
        alert(error.message || 'Failed to delete appointment');
      }
    }
  }
}
