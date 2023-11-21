import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { IRoom } from "../../models/iroom.model";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  selectedRoom: IRoom | null = null;
  rooms: IRoom[] = [];
  filteredRooms: IRoom[] = [];
  filterText: string = '';
  newRoom: IRoom = {
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
    destinationCoordinateY: 0
  };
  successMessage: string | null = null;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(
      (rooms) => {
        console.log(rooms);
        this.rooms = rooms;
        this.filteredRooms = rooms;
      },
      (error) => {
        console.error('Failed to fetch rooms:', error);
      }
    );
  }

  filterRooms(): void {
    if (this.filterText) {
      this.filteredRooms = this.rooms.filter(room => room.roomId.toLowerCase().includes(this.filterText.toLowerCase()));
    } else {
      this.filteredRooms = this.rooms;
    }
  }

  createRoom(): void {
    this.roomService.createRoom(this.newRoom).subscribe(
      (room) => {
        this.rooms.push(room);
        this.newRoom = {
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
          destinationCoordinateY: 0
        };
        this.successMessage = 'Room created successfully!';
        setTimeout(() => {
          this.successMessage = null;
        }, 1500); // Message will disappear after 3 seconds
      },
      (error) => {
        console.error('Failed to create room:', error);
      }
    );
  }

}
