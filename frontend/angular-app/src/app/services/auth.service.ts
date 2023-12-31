import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { response } from "express";
import { IRole } from "../models/irole.model";
import { IBuilding } from "../models/ibuilding.model";

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
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.userDTO));
      })
    );
  }

  signup(firstName: string, lastName: string, email: string, password: string, role: string) {
    return this.http.post('http://localhost:4000/api/auth/signup', { firstName, lastName, email, password, role });
  }

  updateAccount(firstName: string, lastName: string, email: string, password: string, role: string){
    return this.http.put('http://localhost:4000/api/auth/updateAccount',  { firstName, lastName, email, password, role });
  }

  getRoles(): Observable<any> {

    const headers = { Authorization: `Bearer ${this.getToken()}` };

    return this.http.get('http://localhost:4000/api/roles', { headers });
  }

  createRole(role: IRole): Observable<any> {

    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post('http://localhost:4000/api/roles', role, { headers });
  }

  isUserAuthorized(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  getCurrentUserEmail(): string {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser).email : null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.currentUser = null;
  }

  logFailedLoginAttempt(email: string) {

    const headers = { Authorization: `Bearer ${this.getToken()}` };

    return this.http.post('http://localhost:4000/api/log/auth', { email }, { headers });
  }

  getUsersWithMoreThanThreeFailedLoginAttempts() {

    const headers = { Authorization: `Bearer ${this.getToken()}` };

    return this.http.get('http://localhost:4000/api/log/auth', { headers });
  }

  deleteAccount(): Observable<any> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const email = this.getCurrentUserEmail();

    return this.http.post(`http://localhost:4000/api/auth/delete`, { email }, { headers });
    localStorage.removeItem('authToken');
    this.currentUser = null;
  }

}
