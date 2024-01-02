import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  roles: any[] = [];
  selectedRole: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}
  isLoading = false;
  ngOnInit() {
    this.authService.getRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Failed to fetch roles:', error);
      }
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill out all fields correctly';
      return;
    }

    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;

    if (this.selectedRole == null) {
      this.errorMessage = 'Role is required';
      return;
    }

    const role = this.selectedRole;

    this.authService.signup(firstName, lastName, email, password, role).subscribe(
      // success callback
      () => {
        this.errorMessage = null;
        this.successMessage = 'Signup successful!';
        this.isLoading = true;

        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        }, 1500);
      },
      // error callback
      (error) => {
        this.errorMessage = 'Signup failed: ' + error.message;
        this.successMessage = null;
        this.isLoading = false;
      }
    );
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 5;
    if (hasNumber && hasMinLength) {
      return null;
    } else {
      return { 'passwordStrength': true };
    }
  }
}
