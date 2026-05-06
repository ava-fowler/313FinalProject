import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AnimalListComponent } from "../../components/animal-list/animal-list";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  templateUrl: './customer.html',
  styleUrls: ['./customer.css'],
  imports: [AnimalListComponent, CommonModule]
})
export class CustomerComponent implements OnInit {
  userEmail = '';
  username = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    this.userEmail = user?.email ?? 'customer';
    this.username = user?.username?? 'username';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}