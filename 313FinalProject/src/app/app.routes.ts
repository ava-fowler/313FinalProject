import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { CustomerComponent } from './pages/customer/customer';
import { AdminComponent } from './pages/admin/admin';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile';
import { CreateAnimalComponent } from './pages/create-animal/create-animal';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },

  // Customer routes
  { path: 'customer', component: CustomerComponent },
  { path: 'customer-profile', component: CustomerProfileComponent },

  // Admin routes (protected - add canActivate when you have the guard ready)
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'admin/create-animal',
    loadComponent: () =>
      import('./pages/create-animal/create-animal').then((m) => m.CreateAnimalComponent),},
  {
    path: 'admin/edit-animal/:id',
    loadComponent: () =>
      import('./pages/create-animal/create-animal').then((m) => m.CreateAnimalComponent),
  },
  { path: 'admin-profile', component: AdminProfileComponent },

  // Animal detail & booking
  {
    path: 'animals/:id',
    loadComponent: () =>
      import('./components/animal-detail/animal-detail').then((m) => m.AnimalDetailComponent),
  },
  {
    path: 'book/:id',
    loadComponent: () =>
      import('./components/book-appointment/book-appointment').then(
        (m) => m.BookAppointmentComponent,
      ),
  },

  // Default redirect
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Catch-all (optional - add a 404 page later)
  { path: '**', redirectTo: 'home' },
];
