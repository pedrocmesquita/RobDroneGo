import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { IFloor } from "../models/ifloor.model";

@Injectable({
  providedIn: "root",
})

export class FloorService {
  private apiUrl = "http://localhost:4000/api"; // Replace with your actual API URL

  constructor(private http:HttpClient, private authService:AuthService) {}

  getFloors(): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.apiUrl}/floors`, { headers });
  }

  createFloor(floor: IFloor): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/floors`, floor, { headers });
  }

  updateFloor(floor: IFloor): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put(`${this.apiUrl}/floors/`,  {
      floorId: floor.floorId,
      floorNumber: floor.floorNumber,
      floorDescription: floor.floorDescription,
    }, { headers });
  }


}
