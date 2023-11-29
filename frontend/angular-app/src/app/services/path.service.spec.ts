import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PathService } from './path.service';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('PathService', () => {
  let pathService: PathService;
  let authService: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PathService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    pathService = TestBed.inject(PathService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(pathService).toBeTruthy();
  });

  it('should retrieve path from the mock API via GET', () => {
    const originB = 'originBuilding';
    const destB = 'destBuilding';
    const originF = 'originFloor';
    const destF = 'destFloor';
    const originX = 'originX';
    const originY = 'originY';
    const destX = 'destX';
    const destY = 'destY';

    authService.getToken.and.returnValue('fakeToken');

    pathService.getPl(originB, destB, originF, destF, originX, originY, destX, destY)
      .subscribe(response => {
        expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
      });

    const expectedUrl = `${pathService.apiUrl}/path/${originB}/${destB}/${originF}/${destF}/${originX}/${originY}/${destX}/${destY}`;
    const req = httpTestingController.expectOne(expectedUrl);

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');

    req.flush({});
  });

});
