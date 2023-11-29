import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from "../../services/auth.service";
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: jasmine.SpyObj<AuthService>; // Create a spy object for AuthService

  beforeEach(() => {
    // Create a spy object with the same methods as AuthService
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser', 'getRoles']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>; // Cast to the spy object
  });

  it("should create home", () => {
    let counter = 0;
    expect(counter).toBe(0);
  });

  // Add more tests for other methods and properties
});
