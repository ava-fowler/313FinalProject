import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit() {
    try {
      await this.auth.registerUser(this.username, this.password);
      alert("Registered and logged in");
      this.router.navigate(['/customer']);
    } catch (err: any) {
      alert(err.message);
    }
  }

goToLogin() {
  this.router.navigate(['/login']);
}

}