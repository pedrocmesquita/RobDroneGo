import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MockAuthService {
  httpClient!: HttpClient;

  isUserAuthorized(): boolean {
    return true; // or implement logic based on your test case
  }

  logout(): void {
    // Add any additional logic needed for testing
  }
}
