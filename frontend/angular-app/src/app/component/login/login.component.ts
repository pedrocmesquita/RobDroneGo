import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AuthService } from "../../services/auth.service";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { error } from "winston";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{

  isLoading = false;
  constructor(private authService: AuthService, private router: Router) {}

  errorMessage: string | null = null;
  successMessage: string | null = null;
  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;


    this.authService.login(email, password).subscribe(
      // success callback
      () => {
        this.errorMessage = null;
        this.successMessage = 'Login successful!';
        this.isLoading = true;
        // Navigate to menu page
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        }, 1500);
      },
      // error callback
      (error) => {
        this.errorMessage = 'Login failed: ' + error.message;
        this.successMessage = null;
        this.isLoading = false;

        // Log the failed login attempt
        this.authService.logFailedLoginAttempt(email).subscribe(
          () => console.log('Logged failed login attempt'),
          (error) => console.error('Failed to log login attempt:', error)
        );
      }
    );
  }

  ngOnInit(): void {
    this.authService.logout();
  }
}
