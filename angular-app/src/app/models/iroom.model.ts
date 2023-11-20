export interface IRoom {
  roomId: string;
  floorId: string;
  roomName: string;
  roomDescription: string;
  roomCategory: string;
  doorX: number;
  doorY: number;
  originCoordinateX: number;
  originCoordinateY: number;
  destinationCoordinateX: number;
  destinationCoordinateY: number;
}
