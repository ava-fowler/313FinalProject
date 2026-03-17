import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.html',
  styleUrls: ['./customer.css']
})
export class CustomerComponent {
  message = 'Welcome, customer!';

  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
