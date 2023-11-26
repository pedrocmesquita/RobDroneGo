import {Service, Inject} from "typedi";
import {Document, FilterQuery, Model} from "mongoose";
import {IRoomPersistence} from "../dataschema/IRoomPersistence";
import IRoomRepo from "../services/IRepos/IRoomRepo";
import {Room} from "../domain/Room/room";
import {RoomMap} from "../mappers/RoomMap";
import e from "express";
import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class RoomRepo implements IRoomRepo {

  constructor(
    @Inject("roomSchema") private roomSchema: Model<IRoomPersistence & Document>,
    @Inject("buildingSchema") private buildingSchema: Model<IRoomPersistence & Document>
  ) {}

  // @ts-ignore
  public async exists(roomId: string): Promise<boolean> {
    const idX = roomId;

    const query = { domainId: idX };
    const roomDocument = await this.roomSchema.findOne(query);

    return !!roomDocument === true;
  }

  public async save(room: Room): Promise<Room> {
    const query = { roomId: room.roomId };

    const roleDocument = await this.roomSchema.findOne(query);

    try{
      if (roleDocument === null) {
        const rawRoom: any = RoomMap.toPersistence(room);
        console.log(rawRoom);

        const roomCreated = await this.roomSchema.create(rawRoom);

        return RoomMap.toDomain(roomCreated);
      } else {
        roleDocument.roomId = room.roomId;
        roleDocument.floorId = room.floorId;
        roleDocument.roomName = room.roomName.roomName;
        roleDocument.roomDescription = room.roomDescription.roomDescription;
        roleDocument.roomCategory = room.roomCategory.category;
        roleDocument.doorX = room.door.doorX;
        roleDocument.doorY = room.door.doorY;
        roleDocument.originCoordinateX = room.originCoordinateX;
        roleDocument.originCoordinateY = room.originCoordinateY;
        roleDocument.destinationCoordinateX = room.destinationCoordinateX;
        roleDocument.destinationCoordinateY = room.destinationCoordinateY;
        await roleDocument.save();

        return room;
      }
    }
    catch(err){
      console.log(err)
      throw err;
    }
  }

  public async findByRoomId(roomId: string): Promise<Room> {
    const idX = roomId;

    const query = { roomId: idX };
    const roomRecord = await this.roomSchema.findOne(query);

    if (roomRecord != null) {
      const room = RoomMap.toDomain(roomRecord);
      return room;
    }
    else {
      return null;
    }
  }

  public async updateNewRoomWithOldRoom(room: Room, oldRoomId: string): Promise<Room> {
    const query = { roomId: oldRoomId };

    const roomDocument = await this.roomSchema.findOne(query);

    if (roomDocument != null) {
      roomDocument.roomId = room.roomId;
      roomDocument.floorId = room.floorId;
      roomDocument.roomName = room.roomName.roomName;
      roomDocument.roomDescription = room.roomDescription.roomDescription;
      roomDocument.roomCategory = room.roomCategory.category;
      roomDocument.doorX = room.door.doorX;
      roomDocument.doorY = room.door.doorY;
      roomDocument.originCoordinateX = room.originCoordinateX;
      roomDocument.originCoordinateY = room.originCoordinateY;
      roomDocument.destinationCoordinateX = room.destinationCoordinateX;
      roomDocument.destinationCoordinateY = room.destinationCoordinateY;
      await roomDocument.save();

      return room;
    }
    else {
      return null;
    }
  }

  public async delete(roomId: string){
    const query = { roomId: roomId };
    await this.roomSchema.deleteOne(query as FilterQuery<IRoomPersistence & Document>);
  }

  public async getRooms(): Promise<Room[]> {
    const rooms = await this.roomSchema.find();

    const roomDTOResult = rooms.map( room => RoomMap.toDomain( room ) as Room );

    return roomDTOResult;
  }

  public async update(room: Room): Promise<Room> {
    await this.roomSchema.updateOne( { roomId: room.roomId }, RoomMap.toDTO(room));

    const updatedRoom = await this.roomSchema.findOne({ roomId: room.roomId });

    return RoomMap.toDomain(updatedRoom);
  }


  public async getConnections(buildingId: string): Promise<Room[]> {
    const building = await this.buildingSchema.findOne({ buildingId: buildingId });

    if (building === null) {
      return null;
    }

    const rooms = await this.roomSchema.find({ buildingId: buildingId, connections: { $exists: true, $ne: [] } });

    const roomDTOResult = rooms.map( room => RoomMap.toDomain( room ) as Room );

    return roomDTOResult;
  }

  public async deleteAllRoomsFromFloor(floorId: string): Promise<void> {
    const rooms = await this.roomSchema.find({ floorId: floorId });

    for (var i = 0; i < rooms.length; i++) {
      const roomId = rooms[i].roomId;
      await this.roomSchema.deleteOne({ roomId: roomId });
    }
  }

  public async findRoomsByFloorId(floorId: string): Promise<Room[]> {
    const rooms = await this.roomSchema.find({ floorId: floorId });

    const roomDTOResult = rooms.map( room => RoomMap.toDomain( room ) as Room );

    return roomDTOResult;
  }
}