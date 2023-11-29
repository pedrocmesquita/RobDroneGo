import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ElevatorService } from './elevator.service';
import { AuthService } from './auth.service';
import { IElevator } from '../models/ielevator.model';
import { of } from 'rxjs';

describe('ElevatorService', () => {
  let elevatorService: ElevatorService;
  let authService: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ElevatorService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    elevatorService = TestBed.inject(ElevatorService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(elevatorService).toBeTruthy();
  });

  it('should retrieve elevators from the mock API via GET', () => {
    const mockElevators: IElevator[] = [
      {
        elevatorId: "1",
        floorsAttended: "1",
        elevatorBrand: "test",
        elevatorModel: "test",
        elevatorSerNum: "test",
        elevatorDesc: "test",
        currentFloor: 1,
        locationX: 1,
        locationY: 1,
      },
    ];

    authService.getToken.and.returnValue('fakeToken');

    elevatorService.getElevators().subscribe((elevators) => {
      expect(elevators).toEqual(mockElevators);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators');

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');

    req.flush(mockElevators);
  });

  it('should send a new elevator via POST to the mock API', () => {
    const mockElevator: IElevator = {
      elevatorId: "1",
      floorsAttended: "1",
      elevatorBrand: "test",
      elevatorModel: "test",
      elevatorSerNum: "test",
      elevatorDesc: "test",
      currentFloor: 1,
      locationX: 1,
      locationY: 1,
    };

    authService.getToken.and.returnValue('fakeToken');

    elevatorService.createElevator(mockElevator).subscribe((response) => {
      expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators');

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual(mockElevator);

    req.flush(mockElevator);
  });

  // Add more test cases for other methods if needed
});
