import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AnimalListComponent } from "../../components/animal-list/animal-list";

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.html',
  styleUrls: ['./customer.css'],
  imports: [AnimalListComponent]
})
export class CustomerComponent {
  message = 'Welcome, customer!';

  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
