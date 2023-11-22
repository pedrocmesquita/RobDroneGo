import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit{

  logs: any = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUsersWithMoreThanThreeFailedLoginAttempts().subscribe(
      (response) => {
        console.log(response);
        this.logs = response;
      },
      (error) => {
        console.error('Failed to fetch users with more than three failed login attempts:', error);
      }
    );
  }


}
