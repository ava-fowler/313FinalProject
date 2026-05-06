import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.html',
})
export class RegisterComponent {
  email = '';
  user = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  async onSubmit() {
    try {
<<<<<<< HEAD
      await this.auth.registerUser(this.email, this.password);
      alert('Registered and logged in');

      // Check role after registration
      if (this.auth.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/customer']);
      }
=======
      await this.auth.registerUser(this.email, this.user, this.password);
      alert("Registered and logged in");
      this.router.navigate(['/customer']);
>>>>>>> 0bd574417f3d2ffe8c9decdb04b067f4df74f4dc
    } catch (err: any) {
      alert(err.message);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
