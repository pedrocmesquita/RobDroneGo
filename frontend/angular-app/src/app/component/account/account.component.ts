import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUser: any = null;
  roles: any[] = [];
  selectedRole: string | null = null;
  roleGestorDeCampus: any = null;
  roleGestorDeFrota: any = null;
  roleAdmin: any = null;
  roleGestorDeTarefas: any = null;
  errorMessage: string | null = null;
  accountForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.accountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      currentPassword: ['', Validators.required],
      newPassword: [''], // Include if applicable
      confirmPassword: [''], // Include if applicable
      selectedRole: ['', Validators.required],
    });
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe(
      () => {
        this.toastr.success('Account deleted successfully');
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastr.error('Failed to delete account:', error);
      }
    );
  }

  downloadInfo() {
    if (!this.currentUser) {
      this.errorMessage = 'No user information to download.';
      return;
    }

    const userInformation = `
      User Information:
      First Name: ${this.currentUser.firstName}
      Last Name: ${this.currentUser.lastName}
      Email: ${this.currentUser.email}
      Role: ${this.currentUser.role}
    `;

    const blob = new Blob([userInformation], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'userInfo.txt';
    link.click();
    this.toastr.success('User information downloaded successfully.', 'Success');
    // Clean up
    URL.revokeObjectURL(link.href);
  }

  updateAccount() {

    const updatedUserData = {
      firstName: this.accountForm.get('firstName')?.value,
      lastName: this.accountForm.get('lastName')?.value,
      email: this.currentUser.email,
      password: this.accountForm.get('currentPassword')?.value,
      newPassword: this.accountForm.get('newPassword')?.value,
      confirmPassword: this.accountForm.get('confirmPassword')?.value,
      role: this.accountForm.get('selectedRole')?.value,
    };

    if (updatedUserData.newPassword !== updatedUserData.confirmPassword) {
      this.toastr.error('New password and its confirmation must match.');
      return;
    }

    console.log(updatedUserData);

    this.authService.updateAccount(
      updatedUserData.firstName,
      updatedUserData.lastName,
      updatedUserData.email,
      updatedUserData.newPassword,
      updatedUserData.role
    ).subscribe(
      () => {
        this.toastr.success('Please login again.','Account updated successfully');
        // If necessary, update the current user object with the new data
        this.currentUser.firstName = updatedUserData.firstName;
        this.currentUser.lastName = updatedUserData.lastName;
        this.currentUser.email = updatedUserData.email;
        this.currentUser.role = updatedUserData.role;
        // Add other fields as needed
        this.accountForm.reset(); // Optionally reset the form
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastr.error('Failed to update account:', error);
      }
    );
  }

  ngOnInit() {
    this.authService.getRoles().subscribe(
      (roles) => {
        this.roles = roles;

        this.currentUser = this.authService.getCurrentUser();
        console.log(this.currentUser);

        if (this.currentUser === null) {
          console.log("User is not logged in");
          return;
        }

        const userRoleId = this.currentUser.role;
        const userRole = this.roles.find(role => role.id === userRoleId);

        if (userRole) {
          this.currentUser.role = userRole.name;
        } else {
          console.error('Failed to find user role:', userRoleId);
        }

        for (let i = 0; i < this.roles.length; i++) {
          if (this.roles[i].name == "Gestor de Campus") {
            this.roleGestorDeCampus = this.roles[i];
          }
          if (this.roles[i].name == "Gestor de Frota") {
            this.roleGestorDeFrota = this.roles[i];
          }
          if (this.roles[i].name == "Admin") {
            this.roleAdmin = this.roles[i];
          }
          if (this.roles[i].name == "Gestor de Tarefas") {
            this.roleGestorDeTarefas = this.roles[i];
          }
        }

        if (this.roleGestorDeCampus == null || this.roleGestorDeFrota == null || this.roleAdmin == null || this.roleGestorDeTarefas == null) {
          this.errorMessage = 'Error while fetching roles';
          return;
        }
      },
      (error) => {
        console.error('Failed to fetch roles:', error);
      }
    );

    if (this.currentUser == null) {
      console.log("User is not logged in");
    }
  }
}
