import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthModule } from '../../shared/auth.module';
import { LoginForm } from '../models/auth.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userLogin: LoginForm = { email: '', password: '' };
  isSubmitting = false;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const verificationToken = this.route.snapshot.queryParams['verification_token'];

    if (verificationToken) {
      this.verifyEmail(verificationToken);
    }
  }

  verifyEmail(token: string): void {
    this.isLoading = true;
    this.authService.verifyEmail(token)
      .subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  login() {
    this.isSubmitting = true;
    this.authService.login(this.userLogin).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }
}
