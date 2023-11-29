import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RobotTypeService } from './robot-type.service';
import { AuthService } from './auth.service';
import { IRobotType } from '../models/irobot-type.model';
import { of } from 'rxjs';

describe('RobotTypeService', () => {
  let robotTypeService: RobotTypeService;
  let authService: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RobotTypeService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    robotTypeService = TestBed.inject(RobotTypeService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(robotTypeService).toBeTruthy();
  });

  it('should retrieve robot types from the mock API via GET', () => {
    const mockRobotTypes: IRobotType[] =
[
  {
    typeId: "1",
    brand: "test",
    model: "test",
    taskCategory: "test",
  }
];


    authService.getToken.and.returnValue('fakeToken');

    robotTypeService.getRobotTypes().subscribe((robotTypes) => {
      expect(robotTypes).toEqual(mockRobotTypes);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robotTypes');

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');

    req.flush(mockRobotTypes);
  });

  it('should send a new robot type via POST to the mock API', () => {
    const mockRobotType: IRobotType =

{
    typeId: "1",
    brand: "test",
    model: "test",
    taskCategory: "test",
}


      authService.getToken.and.returnValue('fakeToken');

    robotTypeService.createRobotType(mockRobotType).subscribe((response) => {
      expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robotTypes');

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual(mockRobotType);

    req.flush(mockRobotType);
  });


});
