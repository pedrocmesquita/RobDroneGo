import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FloorService } from './floor.service';
import { AuthService } from './auth.service';
import { IFloor } from '../models/ifloor.model';
import { of } from 'rxjs';

describe('FloorService', () => {
  let floorService: FloorService;
  let authService: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FloorService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    floorService = TestBed.inject(FloorService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(floorService).toBeTruthy();
  });

  it('should retrieve floors from the mock API via GET', () => {
    const mockFloors: IFloor[] =
      [
        {
          buildingId: "1",
          floorNumber: 1,
          floorId: "1",
          floorDescription: "test",
          connections: [],
          rooms: [],
          elevators: [],
        },
        {
          buildingId: "1",
          floorNumber: 1,
          floorId: "1",
          floorDescription: "test",
          connections: [],
          rooms: [],
          elevators: [],
        },
      ];
    authService.getToken.and.returnValue('fakeToken');

    floorService.getFloors().subscribe((floors) => {
      expect(floors).toEqual(mockFloors);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors');

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');

    req.flush(mockFloors);
  });

  it('should send a new floor via POST to the mock API', () => {
    const mockFloor: IFloor =
      {
        buildingId: "1",
        floorNumber: 1,
        floorId: "1",
        floorDescription: "test",
        connections: [],
        rooms: [],
        elevators: [],
      };

    authService.getToken.and.returnValue('fakeToken');

    floorService.createFloor(mockFloor).subscribe((response) => {
      expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors');

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual(mockFloor);

    req.flush(mockFloor);
  });

  it('should send an updated floor via PUT to the mock API', () => {
    const mockFloor: IFloor =
      {
        buildingId: "1",
        floorNumber: 1,
        floorId: "1",
        floorDescription: "test",
        connections: [],
        rooms: [],
        elevators: [],
      };
    authService.getToken.and.returnValue('fakeToken');

    floorService.updateFloor(mockFloor).subscribe((response) => {
      expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors/');

    expect(req.request.method).toEqual('PUT');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual({
      floorId: mockFloor.floorId,
      floorNumber: mockFloor.floorNumber,
      floorDescription: mockFloor.floorDescription,
    });

    req.flush(mockFloor);
  });

  // Add more test cases for other methods if needed
});
