import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RoomComponent } from './room.component';
import { RoomService } from '../../services/room.service';
import { IRoom } from '../../models/iroom.model';

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let roomService: RoomService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RoomComponent],
      providers: [RoomService],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    roomService = TestBed.inject(RoomService);

    // Mock the getRooms method
    spyOn(roomService, 'getRooms').and.returnValue(
      of([
        { roomId: '1', floorId: 'floor1', roomName: 'Room 1', roomDescription: '', roomCategory: '', doorX: 0, doorY: 0, originCoordinateX: 0, originCoordinateY: 0, destinationCoordinateX: 0, destinationCoordinateY: 0 },
        { roomId: '2', floorId: 'floor2', roomName: 'Room 2', roomDescription: '', roomCategory: '', doorX: 0, doorY: 0, originCoordinateX: 0, originCoordinateY: 0, destinationCoordinateX: 0, destinationCoordinateY: 0 },
      ])
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter rooms', () => {
    // Arrange
    const rooms: IRoom[] = [
      { roomId: '1', floorId: 'floor1', roomName: 'Room 1', roomDescription: '', roomCategory: '', doorX: 0, doorY: 0, originCoordinateX: 0, originCoordinateY: 0, destinationCoordinateX: 0, destinationCoordinateY: 0 },
      { roomId: '2', floorId: 'floor2', roomName: 'Room 2', roomDescription: '', roomCategory: '', doorX: 0, doorY: 0, originCoordinateX: 0, originCoordinateY: 0, destinationCoordinateX: 0, destinationCoordinateY: 0 },
    ];
    component.rooms = rooms;
    component.filterText = '1';

    // Act
    component.filterRooms();

    // Assert
    expect(component.filteredRooms.length).toEqual(1);
    expect(component.filteredRooms[0].roomId).toEqual('1');
  });

  it('should select option', () => {
    // Arrange
    const option = 'option1';

    // Act
    component.selectOption(option);

    // Assert
    expect(component.selectedOption).toEqual(option);
  });

  it('should create room', () => {
    // Arrange
    const newRoom: IRoom = {
      roomId: '3',
      floorId: 'floor3',
      roomName: 'Room 3',
      roomDescription: '',
      roomCategory: '',
      doorX: 0,
      doorY: 0,
      originCoordinateX: 0,
      originCoordinateY: 0,
      destinationCoordinateX: 0,
      destinationCoordinateY: 0,
    };
    spyOn(roomService, 'createRoom').and.returnValue(of(newRoom));

    // Act
    component.createRoom();

    // Assert
    expect(component.rooms).toContain(newRoom);
    expect(component.newRoom).toEqual({
      roomId: '',
      floorId: '',
      roomName: '',
      roomDescription: '',
      roomCategory: '',
      doorX: 0,
      doorY: 0,
      originCoordinateX: 0,
      originCoordinateY: 0,
      destinationCoordinateX: 0,
      destinationCoordinateY: 0,
    });
  });
});
