import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterModule, ThemeToggleComponent],
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
}
