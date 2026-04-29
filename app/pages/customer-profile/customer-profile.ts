import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { AppointmentService } from '../../services/appointment';
import { AnimalService } from '../../services/animal';
import { Animal } from '../../models/animal';

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

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-profile.html',
  styleUrls: ['./customer-profile.css'],
})
export class CustomerProfileComponent implements OnInit {
  userEmail = '';
  username = '';
  newUsername = '';
  newPassword = '';
  confirmPassword = '';
  showChangeUsername = false;
  showChangePassword = false;
  showPassword = false;
  
  appointments: Appointment[] = [];
  favoriteAnimals: Animal[] = [];
  loadingAppointments = false;
  loadingFavorites = false;
  
  successMessage = '';
  errorMessage = '';
  isUpdatingUsername = false;
  isUpdatingPassword = false;

  constructor(
    private auth: AuthService,
    private appointmentService: AppointmentService,
    private animalService: AnimalService
  ) {}

  ngOnInit() {
    this.loadUserInfo();
    this.loadAppointments();
    this.loadFavoriteAnimals();
  }

  loadUserInfo() {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.userEmail = user.email || '';
      this.username = user.username || '';
    }
  }

  loadAppointments() {
    this.loadingAppointments = true;
    this.appointmentService.getAppointmentsByEmail(this.userEmail).then((appointments) => {
      this.appointments = appointments.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      this.loadingAppointments = false;
    }).catch((err) => {
      console.error('Failed to load appointments:', err);
      this.loadingAppointments = false;
    });
  }

  loadFavoriteAnimals() {
    this.loadingFavorites = true;
    const favorites = this.getFavorites();
    this.animalService.getAnimals().subscribe(
      (animals) => {
        this.favoriteAnimals = animals.filter(a => favorites.includes(a.id || ''));
        this.loadingFavorites = false;
      },
      (err) => {
        console.error('Failed to load favorite animals:', err);
        this.loadingFavorites = false;
      }
    );
  }

  async updateUsername() {
    if (!this.newUsername) {
      this.errorMessage = 'Username cannot be empty';
      return;
    }
    this.isUpdatingUsername = true;
    try {
      await this.auth.updateUsername(this.newUsername);
      this.username = this.newUsername;
      this.newUsername = '';
      this.showChangeUsername = false;
      this.successMessage = 'Username updated successfully';
      setTimeout(() => this.successMessage = '', 3000);
    } catch (err: any) {
      console.error('Failed to update username:', err);
      this.errorMessage = err?.message || 'Failed to update username';
      setTimeout(() => this.errorMessage = '', 4000);
    } finally {
      this.isUpdatingUsername = false;
    }
  }

  async updatePassword() {
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all password fields';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isUpdatingPassword = true;
    try {
      await this.auth.updatePassword(this.newPassword);
      this.newPassword = '';
      this.confirmPassword = '';
      this.showChangePassword = false;
      this.successMessage = 'Password updated successfully';
      setTimeout(() => this.successMessage = '', 3000);
    } catch (err: any) {
      console.error('Failed to update password:', err);
      this.errorMessage = err?.message || 'Failed to update password';
      setTimeout(() => this.errorMessage = '', 4000);
    } finally {
      this.isUpdatingPassword = false;
    }
  }

  async cancelAppointment(appointmentId?: string) {
    if (!appointmentId) return;
    if (!confirm('Cancel this appointment?')) return;
    try {
      await this.appointmentService.cancelAppointment(appointmentId);
      this.loadAppointments();
      this.successMessage = 'Appointment cancelled';
      setTimeout(() => this.successMessage = '', 3000);
    } catch (err: any) {
      console.error('Failed to cancel appointment:', err);
      this.errorMessage = err?.message || 'Failed to cancel appointment';
      setTimeout(() => this.errorMessage = '', 4000);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getPasswordDisplay(): string {
    return this.showPassword ? '••••••••' : '••••••••';
  }

  toggleFavorite(animalId: string | undefined) {
    if (!animalId) return;
    const favorites = this.getFavorites();
    const index = favorites.indexOf(animalId);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(animalId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.loadFavoriteAnimals();
  }

  getFavorites(): string[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  isFavorite(animalId: string | undefined): boolean {
    if (!animalId) return false;
    return this.getFavorites().includes(animalId);
  }

  cancelChangeUsername() {
    this.newUsername = '';
    this.showChangeUsername = false;
    this.errorMessage = '';
  }

  cancelChangePassword() {
    this.newPassword = '';
    this.confirmPassword = '';
    this.showChangePassword = false;
    this.errorMessage = '';
  }
}
