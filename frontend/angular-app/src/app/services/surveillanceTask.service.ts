import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { ISurveillanceTask } from "../models/isurveillancetask.model";
@Injectable({
  providedIn: "root",
})

export class SurveillanceTaskService {
  private apiUrl = "https://localhost:5001/api"; // Replace with your actual API URL

  constructor(private http:HttpClient, private authService:AuthService) {}

  getTasks(): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.apiUrl}/SurveillanceTask`);
  }

  createTask(task: ISurveillanceTask): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/SurveillanceTask`, task, { headers });
  }

  updateTask(task: ISurveillanceTask): Observable<any> {

      const token = this.authService.getToken();
      const headers = { Authorization: `Bearer ${token}` };

      return this.http.put(`${this.apiUrl}/SurveillanceTask`, task, { headers });
  }
}
