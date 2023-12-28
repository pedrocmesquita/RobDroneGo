import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUser: any = null;
  roles: any[] = [];
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
    });
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe(
      () => {
        console.log('Account deleted successfully');
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Failed to delete account:', error);
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
    if (this.accountForm.invalid) {
      this.toastr.error('All fields are required to be filled.', 'Error editing account info');
      return;
    }

    const updatedUserData = {
      firstName: this.accountForm.value.firstName,
      lastName: this.accountForm.value.lastName,
      email: this.accountForm.value.email,
    };

    this.authService.updateAccount().subscribe(
      () => {
        console.log('Account updated successfully');
        // Optionally, update the currentUser object in your component
        this.currentUser.firstName = updatedUserData.firstName;
        this.currentUser.lastName = updatedUserData.lastName;
        this.currentUser.email = updatedUserData.email;
      },
      (error) => {
        console.error('Failed to update account:', error);
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
