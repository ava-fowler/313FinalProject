import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { CustomerComponent } from './pages/customer/customer';
import { AdminComponent } from './pages/admin/admin';
import { CustomerProfileComponent } from './pages/customer-profile/customer-profile';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile';
import { AnimalListComponent } from './components/animal-list/animal-list';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'customer-profile', component: CustomerProfileComponent },
    { path: 'admin-profile', component: AdminProfileComponent },
    { path: 'animal-list', component: AnimalListComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'}
];
