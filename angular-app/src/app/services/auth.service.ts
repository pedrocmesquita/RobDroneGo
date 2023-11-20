import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { response } from "express";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  currentUser: any = null;
  token: string | null = null;
  response: any = null;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // Replace with your actual backend API endpoint
    return this.http.post<any>('http://localhost:4000/api/auth/signin', { email, password }).pipe(
      tap(response => {
        console.log(response);
        this.currentUser = response.userDTO;
        this.token = response.token;
      })
    );
  }

  signup(firstName: string, lastName: string, email: string, password: string, role: string) {
    // Replace with your actual backend API endpoint
    return this.http.post('http://localhost:4000/api/auth/signup', { firstName, lastName, email, password, role });
  }

  getRoles(): Observable<any> {
    // Replace with your actual backend API endpoint
    return this.http.get('http://localhost:4000/api/roles');
  }

  createRole(roleName: string): Observable<any> {
    // Replace with your actual backend API endpoint
    return this.http.post('http://localhost:4000/api/roles', { name: roleName });
  }

  isUserAuthorized(): boolean {
    return !!this.currentUser;
  }

  getToken(): string | null {
    return this.token;
  }

}
