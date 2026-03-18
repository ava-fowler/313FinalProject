import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit() {
    try {
      // Login using Firebase email + password
      const role = await this.auth.loginUser(this.email, this.password);

      // Hardcoded admin email
      const ADMIN_EMAIL = 'admin@webapp.com';

      // Determine final role
      const finalRole = this.email.toLowerCase() === ADMIN_EMAIL ? 'admin' : role;

      // Redirect based on role
      if (finalRole === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/customer']);
      }

    } catch (err: any) {
      alert(err.message);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}