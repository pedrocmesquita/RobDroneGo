import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IBuilding} from "../models/building.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class BuildingService{
  buildingURL = 'https://lei-nodejs-016.onrender.com/api/buildings';
  // buildingURL = 'http://localhost:3000/api/buildings';


  constructor(private http: HttpClient) { }

  addBuilding(building : IBuilding) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<IBuilding>(this.buildingURL, building, { headers });
  }

  getBuildings(): Observable<any> {
    return this.http.get<any>(this.buildingURL);
  }

  getBuilding(buildingId : string){
    return this.http.get<IBuilding>(this.buildingURL+ "/" + buildingId);
  }




}

