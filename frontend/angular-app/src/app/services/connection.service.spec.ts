import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConnectionService } from './connection.service';
import { AuthService } from './auth.service';
import { IConnection } from '../models/iconnection.model';

describe('ConnectionService', () => {
  let connectionService: ConnectionService;
  let authService: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConnectionService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    connectionService = TestBed.inject(ConnectionService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(connectionService).toBeTruthy();
  });

  it('should retrieve connections from the mock API via GET', () => {
    const mockConnections: IConnection[] = [
      {
        connectionId: "1",
        buildingfromId: "1",
        buildingtoId: "1",
        floorfromId: "1",
        floortoId: "1",
        locationX: 1,
        locationY: 1,
        locationToX: 1,
        locationToY: 1,
      },
      {
        connectionId: "2",
        buildingfromId: "1",
        buildingtoId: "1",
        floorfromId: "1",
        floortoId: "1",
        locationX: 1,
        locationY: 1,
        locationToX: 1,
        locationToY: 1,
      },
    ];
    authService.getToken.and.returnValue('fakeToken');

    connectionService.getConnections().subscribe((connections) => {
      expect(connections).toEqual(mockConnections);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/connections');

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');

    req.flush(mockConnections);
  });

  it('should send a new connection via POST to the mock API', () => {
    const mockConnection: IConnection =
    {
      connectionId: "1",
      buildingfromId: "1",
      buildingtoId: "1",
      floorfromId: "1",
      floortoId: "1",
      locationX: 1,
      locationY: 1,
      locationToX: 1,
      locationToY: 1,
    };
    authService.getToken.and.returnValue('fakeToken');

    connectionService.createConnection(mockConnection).subscribe((response) => {
      expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/connections');

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual(mockConnection);

    req.flush(mockConnection);
  });

  it('should send an updated connection via PUT to the mock API', () => {
    const mockConnection: IConnection = {
      connectionId: "1",
      buildingfromId: "1",
      buildingtoId: "1",
      floorfromId: "1",
      floortoId: "1",
      locationX: 1,
      locationY: 1,
      locationToX: 1,
      locationToY: 1,
    };

    authService.getToken.and.returnValue('fakeToken');

    connectionService.updateConnection(mockConnection).subscribe((response) => {
      expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/connections/');

    expect(req.request.method).toEqual('PUT');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual({
      connectionId: mockConnection.connectionId,
      buildingfromId: mockConnection.buildingfromId,
      buildingtoId: mockConnection.buildingtoId,
      floorfromId: mockConnection.floorfromId,
      floortoId: mockConnection.floortoId,
      locationX: mockConnection.locationX,
      locationY: mockConnection.locationY,
      locationToX: mockConnection.locationToX,
      locationToY: mockConnection.locationToY,
    });

    req.flush(mockConnection);
  });


});
