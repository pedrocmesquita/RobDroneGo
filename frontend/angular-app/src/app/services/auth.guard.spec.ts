import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule], // Include HttpClientTestingModule
      providers: [AuthGuard, AuthService],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation when the user is authorized', () => {
    spyOn(authService, 'isUserAuthorized').and.returnValue(true);

    const canActivate = authGuard.canActivate();

    expect(canActivate).toBe(true);
    expect(authService.isUserAuthorized).toHaveBeenCalled();
  });

  it('should not allow activation when the user is not authorized and navigate to /unauthorized', () => {
    spyOn(authService, 'isUserAuthorized').and.returnValue(false);
    spyOn(router, 'navigate');

    const canActivate = authGuard.canActivate();

    expect(canActivate).toBe(false);
    expect(authService.isUserAuthorized).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });
});
