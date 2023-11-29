import { ComponentFixture, fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from '../../services/auth.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      declarations: [SignupComponent],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('should sign up successfully', fakeAsync( () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(authService, 'signup').and.returnValue(of({}));

    const mockForm = {
      valid: true,
      value: { firstName: 'Dadsa', lastName: 'Asd', email: 'dsd@gmail.com', password: 'asXd23as' , role: 'Admin'},
      resetForm: () => null,
    } as any as NgForm;


    component.onSubmit(mockForm);

    tick(1500);

    flush();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  }));*/




  it('should not submit with invalid form', () => {
    const authServiceSpy = spyOn(authService, 'signup');

    const mockForm: unknown = {
      valid: false,
      value: { email: 'test@test.com', password: 'password' },
      resetForm: () => null,
    };

    const castedForm = mockForm as NgForm;

    component.onSubmit(castedForm);
    expect(authServiceSpy).not.toHaveBeenCalled();
  });
});
