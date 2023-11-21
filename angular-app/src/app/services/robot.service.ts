import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { IRobot } from "../models/irobot.model"; // Replace with your actual Robot interface

@Injectable({
  providedIn: "root",
})

export class RobotService {
  private apiUrl = "http://localhost:4000/api"; // Replace with your actual API URL

  constructor(private http:HttpClient, private authService:AuthService) {}

  getRobots(): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.apiUrl}/robots`, { headers });
  }

  createRobot(robot: IRobot): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/robots`, robot, { headers });
  }

  patchRobot(idRobot: string, robotData: Partial<IRobot>): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.patch(`${this.apiUrl}/robots/${idRobot}`, robotData, { headers });
  }
}
