import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { Router, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  currentUser: any = null;
  roleGestorDeCampus: any = null;
  roleGestorDeFrota: any = null;
  roleAdmin: any = null;
  roleGestorDeTarefas: any = null;
  roleEstudante: any = null;
  roleProfessor: any = null;
  roles: any[] = [];

  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) {
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
          if (this.roles[i].name == "Estudante") {
            this.roleEstudante = this.roles[i];
          }
          if (this.roles[i].name == "Professor") {
            this.roleProfessor = this.roles[i];
          }
        }

        console.log(this.roleGestorDeCampus);
        console.log(this.roleGestorDeFrota);
        console.log(this.roleAdmin);
        console.log(this.roleGestorDeTarefas);
        console.log(this.roleEstudante);
        console.log(this.roleProfessor);

        // If any is null, then throw an error
        if (this.roleGestorDeCampus == null || this.roleGestorDeFrota == null || this.roleAdmin == null || this.roleGestorDeTarefas == null || this.roleEstudante == null || this.roleProfessor == null) {
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
