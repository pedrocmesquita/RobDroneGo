import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { IConnection } from "../models/iconnection.model";

@Injectable({
  providedIn: "root",
})

export class ConnectionService {
  private apiUrl = "http://localhost:4000/api"; // Replace with your actual API URL
  selectedConnection: IConnection | null = null;

  constructor(private http:HttpClient, private authService:AuthService) {}

  getConnections(): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get(`${this.apiUrl}/connections`, { headers });
  }

  createConnection(connection: IConnection): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/connections`, connection, { headers });
  }

  // In connection.service.ts
  updateConnection(connection: IConnection): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put(`${this.apiUrl}/connections/`,  {
      connectionId: connection.connectionId,
      buildingfromId: connection.buildingfromId,
      buildingtoId: connection.buildingtoId,
      floorfromId: connection.floorfromId,
      floortoId: connection.floortoId,
      locationX: connection.locationX,
      locationY: connection.locationY,
      locationToX: connection.locationToX,
      locationToY: connection.locationToY,
    }, { headers });
  }
}
