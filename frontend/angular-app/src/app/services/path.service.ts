import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class PathService {
  public apiUrl = "http://localhost:4000/api";

  constructor(private http:HttpClient, private authService:AuthService) {}
  getPl(originB: string,destB: string,originF: string,destF:string,originX: string,originY: string,destX: string,destY: string): Observable<any> {
    console.log("PathService.getPl");
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    console.log(`${this.apiUrl}/path/${originB}/${destB}/${originF}/${destF}/${originX}/${originY}/${destX}/${destY}`);
    return this.http.get(`${this.apiUrl}/path/${originB}/${destB}/${originF}/${destF}/${originX}/${originY}/${destX}/${destY}`, { headers });
}
}
