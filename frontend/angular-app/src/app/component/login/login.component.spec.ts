import { ComponentFixture, TestBed, tick, fakeAsync, flush } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [LoginComponent],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in successfully', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of({}));

    const mockForm = {
      valid: true,
      value: { email: 'mc@gmail.com', password: '123' },
      resetForm: () => null,
    } as any as NgForm;

    component.onSubmit(mockForm);

    // Simulate the passage of time
    tick(1500);

    // Manually flush the microtasks queue
    flush();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));




  it('should log out on init', () => {
    spyOn(authService, 'logout');

    component.ngOnInit();
    expect(authService.logout).toHaveBeenCalled();
  });
});
