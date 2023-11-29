import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomService } from './room.service';
import { AuthService } from './auth.service';
import { IRoom } from '../models/iroom.model';
import { of } from 'rxjs';

describe('RoomService', () => {
  let roomService: RoomService;
  let authService: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RoomService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    roomService = TestBed.inject(RoomService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(roomService).toBeTruthy();
  });

  it('should retrieve rooms from the mock API via GET', () => {
    const mockRooms: IRoom[] =
[
  {

    roomId: "1",
    floorId: "1",
    roomName: "Room 1",
    roomDescription: "Room 1",
    roomCategory: "Room 1",
    doorX: 1,
    doorY: 1,
    originCoordinateX: 1,
    originCoordinateY: 1,
    destinationCoordinateX: 1,
    destinationCoordinateY: 1
  },
  {
    roomId: "2",
    floorId: "2",
    roomName: "Room 2",
    roomDescription: "Room 2",
    roomCategory: "Room 2",
    doorX: 2,
    doorY: 2,
    originCoordinateX: 2,
    originCoordinateY: 2,
    destinationCoordinateX: 2,
    destinationCoordinateY: 2
  },
  {
    roomId: "3",
    floorId: "3",
    roomName: "Room 3",
    roomDescription: "Room 3",
    roomCategory: "Room 3",
    doorX: 3,
    doorY: 3,
    originCoordinateX: 3,
    originCoordinateY: 3,
    destinationCoordinateX: 3,
    destinationCoordinateY: 3
  },
  {
    roomId: "4",
    floorId: "4",
    roomName: "Room 4",
    roomDescription: "Room 4",
    roomCategory: "Room 4",
    doorX: 4,
    doorY: 4,
    originCoordinateX: 4,
    originCoordinateY: 4,
    destinationCoordinateX: 4,
    destinationCoordinateY: 4
  },
  {
    roomId: "5",
    floorId: "5",
    roomName: "Room 5",
    roomDescription: "Room 5",
    roomCategory: "Room 5",
    doorX: 5,
    doorY: 5,
    originCoordinateX: 5,
    originCoordinateY: 5,
    destinationCoordinateX: 5,
    destinationCoordinateY: 5
  },
  {
    roomId: "6",
    floorId: "6",
    roomName: "Room 6",
    roomDescription: "Room 6",
    roomCategory: "Room 6",
    doorX: 6,
    doorY: 6,
    originCoordinateX: 6,
    originCoordinateY: 6,
    destinationCoordinateX: 6,
    destinationCoordinateY: 6
  }
];
    authService.getToken.and.returnValue('fakeToken');

    roomService.getRooms().subscribe((rooms) => {
      expect(rooms).toEqual(mockRooms);
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/rooms');

    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');

    req.flush(mockRooms);
  });

  it('should send a new room via POST to the mock API', () => {
    const mockRoom: IRoom =
{
  roomId: "1",
  floorId: "1",
  roomName: "Room 1",
  roomDescription: "Room 1",
  roomCategory: "Room 1",
  doorX: 1,
  doorY: 1,
  originCoordinateX: 1,
  originCoordinateY: 1,
  destinationCoordinateX: 1,
  destinationCoordinateY: 1
};

    authService.getToken.and.returnValue('fakeToken');

    roomService.createRoom(mockRoom).subscribe((response) => {
      expect(response).toBeTruthy(); // You can add more specific expectations based on your requirements
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/rooms');

    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Authorization')).toEqual('Bearer fakeToken');
    expect(req.request.body).toEqual(mockRoom);


  });


});
