import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { RoomDescription } from "./roomDescription";
import { RoomName } from "./roomName";
import { RoomCategory } from "./roomCategory";
import { Door } from "./door";
import IRoomDTO from "../../dto/IRoomDTO";
import { RoomCategoryType } from './roomCategory';


interface RoomProps {
  roomId: string;
  floorId: string;
  roomName: RoomName;
  roomDescription: RoomDescription;
  roomCategory: RoomCategory;
  door: Door;
  originCoordinateX: number;
  originCoordinateY: number;
  destinationCoordinateX: number;
  destinationCoordinateY: number;
}

export class Room extends AggregateRoot<RoomProps>{

  get id(): UniqueEntityID {
    return this._id;
  }
  get roomId(): string {
    return this.props.roomId;
  }
  get roomCategory(): RoomCategory {
    return this.props.roomCategory;
  }
  get floorId(): string {
    return this.props.floorId;
  }
  get roomName(): RoomName {
    return this.props.roomName;
  }
  get roomDescription(): RoomDescription {
    return this.props.roomDescription;
  }
  get door(): Door {
    return this.props.door;
  }
  set roomName(value: RoomName) {
    this.props.roomName = value;
  }
  set roomDescription(value: RoomDescription) {
    this.props.roomDescription = value;
  }
  set door(value: Door) {
    this.props.door = value;
  }
  set floorId(value: string) {
    this.props.floorId = value;
  }

  get originCoordinateX(): number {
    return this.props.originCoordinateX;
  }

  get originCoordinateY(): number {
    return this.props.originCoordinateY;
  }

  get destinationCoordinateX(): number {
    return this.props.destinationCoordinateX;
  }

  get destinationCoordinateY(): number {
    return this.props.destinationCoordinateY;
  }

  private constructor(props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (roomDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {
    const roomId = roomDTO.roomId;
    const floorId = roomDTO.floorId;
    const roomName = roomDTO.roomName;
    const roomDescription = roomDTO.roomDescription;
    const roomCategory = roomDTO.roomCategory;
    const doorX = roomDTO.doorX;
    const doorY = roomDTO.doorY;
    const originCoordinateX = roomDTO.originCoordinateX;
    const originCoordinateY = roomDTO.originCoordinateY;
    const destinationCoordinateX = roomDTO.destinationCoordinateX;
    const destinationCoordinateY = roomDTO.destinationCoordinateY;

    const room = new Room(
      {
        roomId: roomId,
        floorId: floorId,
        roomName: RoomName.create({roomName}).getValue(),
        roomDescription: RoomDescription.create({roomDescription}).getValue(),
        roomCategory: RoomCategory.create({ category: roomCategory as RoomCategoryType }).getValue(),
        door: Door.create({doorX, doorY}).getValue(),
        originCoordinateX: originCoordinateX,
        originCoordinateY: originCoordinateY,
        destinationCoordinateX: destinationCoordinateX,
        destinationCoordinateY: destinationCoordinateY,
      },
      id
    );
    return Result.ok<Room>(room);
  }
}

