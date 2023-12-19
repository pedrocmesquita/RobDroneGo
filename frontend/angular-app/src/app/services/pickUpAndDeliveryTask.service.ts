import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { IPickupAndDeliveryTask } from "../models/ipickupanddeliverytask.model";

@Injectable({
  providedIn: "root",
}
)

export class PickUpAndDeliveryTaskService {
  private apiUrl = "http://localhost:5000/api"; // Replace with your actual API URL

  constructor(private http:HttpClient, private authService:AuthService) {}

  getTasks(): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.apiUrl}/PickUpAndDeliveryTask`, { headers });
  }

  createTask(task: IPickupAndDeliveryTask): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/PickUpAndDeliveryTask`, task, { headers });
  }
}
