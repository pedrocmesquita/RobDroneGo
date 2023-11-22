import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { IRobotType } from "../models/irobot-type.model"; // Replace with your actual RobotType interface

@Injectable({
  providedIn: "root",
})

export class RobotTypeService {
  private apiUrl = "http://localhost:4000/api"; // Replace with your actual API URL

  constructor(private http:HttpClient, private authService:AuthService) {}

  getRobotTypes(): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.apiUrl}/robotTypes`, { headers });
  }

  createRobotType(robotType: IRobotType): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/robotTypes`, robotType, { headers });
  }
}
