import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  constructor(private authService: AuthService, private router: Router) {}
  switchUser() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  myAccount(){
    this.router.navigate(['/account']);
  }
  isUserAuthorized(): boolean {
    return this.authService.isUserAuthorized();
  }
}
