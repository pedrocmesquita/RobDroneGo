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
  private apiUrl = "https://localhost:5001/api"; // Replace with your actual API URL

  constructor(private http:HttpClient, private authService:AuthService) {}

  getTasks(): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.apiUrl}/PickUpAndDeliveryTask`);
  }

  createTask(task: IPickupAndDeliveryTask): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/PickUpAndDeliveryTask`, task, { headers });
  }

  updateTask(task: IPickupAndDeliveryTask): Observable<any> {

    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put(`${this.apiUrl}/PickUpAndDeliveryTask`, task, { headers });
  }
}
