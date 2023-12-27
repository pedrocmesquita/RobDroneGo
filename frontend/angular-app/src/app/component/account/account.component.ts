import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  currentUser: any = null;
  roleGestorDeCampus: any = null;
  roleGestorDeFrota: any = null;
  roleAdmin: any = null;
  roleGestorDeTarefas: any = null;
  roles: any[] = [];

  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) {
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

    // Clean up
    URL.revokeObjectURL(link.href);
  }
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser()
    console.log(this.currentUser);

    if (this.currentUser === null) {
      console.log("User is not logged in");
      return;
    }

    this.authService.getRoles().subscribe(
      (roles) => {
        this.roles = roles;

        // Loop through the roles array and find the role with name "Gestor de Campus"
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

        console.log(this.roleGestorDeCampus);
        console.log(this.roleGestorDeFrota);
        console.log(this.roleAdmin);
        console.log(this.roleGestorDeTarefas);

        // If any is null, then throw an error
        if (this.roleGestorDeCampus == null || this.roleGestorDeFrota == null || this.roleAdmin == null || this.roleGestorDeTarefas == null) {
          this.errorMessage = 'Error while fetching roles';
          return;
        }
      },
      (error) => {
        console.error('Failed to fetch roles:', error);
      }
    );

    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    if (this.currentUser == null) {
      //this.router.navigate(['/login']);
      console.log("User is not logged in");
    }
  }

}
