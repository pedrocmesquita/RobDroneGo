import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { IElevator } from "../models/ielevator.model";

@Injectable({
  providedIn: "root",
})

export class ElevatorService {
  private apiUrl = "http://localhost:4000/api"; // Replace with your actual API URL

  constructor(private http:HttpClient, private authService:AuthService) {}

  getElevators(): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.apiUrl}/elevators`, { headers });
  }

  createElevator(elevator: IElevator): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/elevators`, elevator, { headers });
  }
}
