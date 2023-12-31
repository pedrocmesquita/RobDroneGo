import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  roles: any[] = [];
  selectedRole: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;
  showCreateForm = false; // Add this property
  showAR = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

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

  toggleAR(){
    this.showAR = !this.showAR;
  }
  toggleCreateAccountForm() {
    this.showCreateForm = !this.showCreateForm; // Toggle the form's visibility
  }

  onSubmit(form: NgForm) {

    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;
    const password = form.value.password;

    if (!this.selectedRole) {
      this.toastr.error('Role is required');
      return;
    }

    const role = this.selectedRole;

    this.authService.signup(firstName, lastName, email, password, role).subscribe(
      () => {
        this.errorMessage = null;
        this.toastr.success('Account created successfuly!');
        this.toggleCreateAccountForm();
        this.isLoading = true;

        setTimeout(() => {
          this.isLoading = false;
          // Implement your navigation logic here
        }, 1500);
      },
      (error) => {
        this.errorMessage = 'Signup failed: ' + error.message;
        this.successMessage = null;
        this.isLoading = false;
      }
    );
  }

  passwordValidator(control: { value: string }): { [key: string]: boolean } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 5;
    if (hasNumber && hasMinLength) {
      return null;
    } else {
      return { passwordStrength: true };
    }
  }
}
