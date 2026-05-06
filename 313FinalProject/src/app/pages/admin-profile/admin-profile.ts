import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService, Appointment } from '../../services/appointment';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.html',
  styleUrls: ['./admin-profile.css'],
})
export class AdminProfileComponent implements OnInit {
  admin: any = {};
  pendingAppointments: Appointment[] = [];
  schedule: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.admin = {
      name: 'Admin User',
      email: 'admin@tlcpets.com',
      role: 'Administrator',
    };

    this.appointmentService.getAppointments().subscribe((appointments: Appointment[]) => {
      this.pendingAppointments = appointments.filter((a: Appointment) => a.status === 'pending');
      this.schedule = appointments.filter((a: Appointment) => a.status === 'approved');
    });
  }

  approveAppointment(id: string | undefined) {
    if (!id) return;
    this.appointmentService.updateStatus(id, 'approved');
  }

  rejectAppointment(id: string | undefined) {
    if (!id) return;
    this.appointmentService.updateStatus(id, 'rejected');
  }
}
