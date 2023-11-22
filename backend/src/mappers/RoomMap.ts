import { Mapper } from "../core/infra/Mapper";
import { Room } from "../domain/Room/room";
import IRoomDTO from "../dto/IRoomDTO";
import { Elevator } from "../domain/Elevator/elevator";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Model } from "mongoose";
import { IElevatorPersistence } from "../dataschema/IElevatorPersistence";
import { IRoomPersistence } from "../dataschema/IRoomPersistence";


export class RoomMap implements Mapper<Room> {
  public static toDTO (room: Room): any {
    return {
      roomId: room.roomId,
      floorId: room.floorId,
      roomName: room.roomName.roomName,
      roomDescription: room.roomDescription.roomDescription,
      roomCategory: room.roomCategory.category,
      doorX: room.door.doorX,
      doorY: room.door.doorY,
      originCoordinateX: room.originCoordinateX,
      originCoordinateY: room.originCoordinateY,
      destinationCoordinateX: room.destinationCoordinateX,
      destinationCoordinateY: room.destinationCoordinateY,
    } as IRoomDTO;
  }

  public static toDomain (room: any | Model<IRoomPersistence & Document>): Room {
    const roomOrError = Room.create(room, new UniqueEntityID(room.domainId));

    roomOrError.isFailure ? console.log(roomOrError.error) : '';

    return roomOrError.isSuccess ? roomOrError.getValue() : null;
  }

  public static toPersistence (room: Room): any {
    return {
      roomId: room.roomId,
      floorId: room.floorId,
      roomName: room.roomName.roomName,
      roomDescription: room.roomDescription.roomDescription,
      roomCategory: room.roomCategory.category,
      doorX: room.door.doorX,
      doorY: room.door.doorY,
      originCoordinateX: room.originCoordinateX,
      originCoordinateY: room.originCoordinateY,
      destinationCoordinateX: room.destinationCoordinateX,
      destinationCoordinateY: room.destinationCoordinateY,
    };
  }
}
