import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  constructor(private authService: AuthService, private router: Router) {}
  errorMessage: string | null = null;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const roleName = form.value.roleName;

    this.authService.createRole(roleName).subscribe(
      // success callback
      () => {
        this.errorMessage = null;

        // Print success message
        console.log('Role created successfully!');

        // Navigate to home page
        this.router.navigate(['/home']);
      },
      // error callback
      (error) => {
        this.errorMessage = 'Role creation failed: ' + error.message;
      }
    );
  }
}
