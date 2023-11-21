import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { IBuilding } from "../models/ibuilding.model";
import bodyParser from "body-parser";

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private apiUrl = 'http://localhost:4000/api'; // Replace with your actual API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBuildings(): Observable<any> {
   const token = this.authService.getToken();
    const fakeToken = "fakeToken";
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<IBuilding[]>(`${this.apiUrl}/buildings`, { headers });
  }

  createBuilding(building: IBuilding): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post(`${this.apiUrl}/buildings`, building, { headers });
  }

  updateBuilding(building: IBuilding): Observable<any> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put(`${this.apiUrl}/buildings/`,  {
        buildingId: building.buildingId,
        buildingName: building.buildingName,
        buildingNumberOfFloors: building.buildingNumberOfFloors,
        buildingDescription: building.buildingDescription,
        dimX: building.dimX,
        dimY: building.dimY,
        wallHeight: building.wallHeight,
        wallWidth: building.wallWidth,
    }, { headers });
  }

  // Your other methods...
}
