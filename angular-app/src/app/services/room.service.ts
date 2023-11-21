import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { IRoom } from "../models/iroom.model";

@Injectable({
  providedIn: "root",
})

export class RoomService {
  private apiUrl = "http://localhost:4000/api"; // Replace with your actual API URL

  constructor(private http:HttpClient, private authService:AuthService) {}

  getRooms(): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.apiUrl}/rooms`, { headers });
  }

  createRoom(room: IRoom): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/rooms`, room, { headers });
  }
}
