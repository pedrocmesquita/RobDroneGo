import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { IRole } from "../../models/irole.model";

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
      this.errorMessage = 'Form is invalid!';
      return;
    }

    const roleName = form.value.roleName;

    console.log('Role name: ' + roleName);

    const role : IRole = {
      name: roleName
    };


    this.authService.createRole(role).subscribe(
      // success callback
      () => {
        this.errorMessage = null;

        // Print success message
        console.log('Role created successfully!');

        // Navigate to home page

        this.router.navigate(['/login']);

      },
      // error callback
      (error) => {
        this.errorMessage = 'Role creation failed: ' + error.message;
      }
    );
  }
}
