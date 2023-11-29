import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuildingService } from './building.service';
import { AuthService } from './auth.service';
import { IBuilding } from '../models/ibuilding.model';

describe('BuildingService', () => {
  let buildingService: BuildingService;
  let authService: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BuildingService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    buildingService = TestBed.inject(BuildingService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(buildingService).toBeTruthy();
  });

  it('should retrieve buildings from the mock API via GET', () => {
    const mockBuildings: IBuilding[] = [
      {
        buildingId: "1",
        buildingName: "test",
        buildingNumberOfFloors: 1,
        buildingDescription: "test",
        dimX: 1,
        dimY: 1,
        wallHeight: 1,
        wallWidth: 1,
      },
      {
        buildingId: "2",
        buildingName: "test",
        buildingNumberOfFloors: 1,
        buildingDescription: "test",
        dimX: 1,
        dimY: 1,
        wallHeight: 1,
        wallWidth: 1,
      },
    ];
    authService.getToken.and.returnValue('fakeToken');

    buildingService.getBuildings().subscribe((buildings) => {
      expect(buildings).toEqual(mockBuildings);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings');

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');

    req.flush(mockBuildings);
  });

  it('should send an updated building via PUT to the mock API', () => {
    const mockBuilding: IBuilding =
    {
      buildingId: "1",
      buildingName: "test",
      buildingNumberOfFloors: 1,
      buildingDescription: "test",
      dimX: 1,
      dimY: 1,
      wallHeight: 1,
      wallWidth: 1,
    };
    authService.getToken.and.returnValue('fakeToken');

    buildingService.updateBuilding(mockBuilding).subscribe((response) => {
      expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings/');

    expect(req.request.method).toEqual('PUT');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual({
      buildingId: mockBuilding.buildingId,
      buildingName: mockBuilding.buildingName,
      buildingNumberOfFloors: mockBuilding.buildingNumberOfFloors,
      buildingDescription: mockBuilding.buildingDescription,
      dimX: mockBuilding.dimX,
      dimY: mockBuilding.dimY,
      wallHeight: mockBuilding.wallHeight,
      wallWidth: mockBuilding.wallWidth,
    });

    req.flush(mockBuilding);
  });

});
