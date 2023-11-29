import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login and store token and current user in local storage', fakeAsync(() => {
    const mockResponse = { token: 'fakeToken', userDTO: { id: 1, email: 'test@example.com' } };
    const email = 'test@example.com';
    const password = 'password';

    authService.login(email, password).subscribe();

    const req = httpMock.expectOne('http://localhost:4000/api/auth/signin');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    tick();

    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('currentUser');

    expect(storedToken).toBe('fakeToken');
    expect(storedUser).toEqual(JSON.stringify(mockResponse.userDTO));
  }));

  it('should signup successfully', fakeAsync(() => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';
    const password = 'password';
    const role = 'user';

    authService.signup(firstName, lastName, email, password, role).subscribe();

    const req = httpMock.expectOne('http://localhost:4000/api/auth/signup');
    expect(req.request.method).toBe('POST');
    req.flush({}); // You can p©rovide a mock response if needed

    tick();
  }));

  it('should get roles successfully', fakeAsync(() => {
    authService.getRoles().subscribe();

    const req = httpMock.expectOne('http://localhost:4000/api/roles');
    expect(req.request.method).toBe('GET');
    req.flush({}); // You can provide a mock response if needed

    tick();
  }));

});
