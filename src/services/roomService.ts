import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IRoomService from './IServices/IRoomService';
import IRoomRepo from '../services/IRepos/IRoomRepo';
import IRoomDTO from '../dto/IRoomDTO';
import { RoomMap } from "../mappers/RoomMap";
import { Room } from '../domain/Room/room';
import IFloorRepo from "./IRepos/IFloorRepo";
import IBuildingRepo from "./IRepos/IBuildingRepo";

@Service()
export default class RoomService implements IRoomService {
  constructor(
    @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
    @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
  ) {}

  public async getRoom(roomId: string): Promise<Result<IRoomDTO>> {
    try {
      const room = await this.roomRepo.findByRoomId(roomId);

      if (room === null) {
        return Result.fail<IRoomDTO>("Room not found");
      }
      else {
        const roomDTOResult = RoomMap.toDTO( room ) as IRoomDTO;
        return Result.ok<IRoomDTO>( roomDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {
      const floor = await this.floorRepo.findByFloorId(roomDTO.floorId);

      if (floor === null) {
        return Result.fail<IRoomDTO>("Floor not found.");
      }

      const room = await this.roomRepo.findByRoomId(roomDTO.roomId);

      if (room != null) {
        return Result.fail<IRoomDTO>("Room already exists.");
      }

      const building = await this.buildingRepo.findByBuildingId(floor.buildingId);

      if (building === null) {
        return Result.fail<IRoomDTO>("Building not found.");
      }

      // Check if the room overlaps with any other rooms on the floor
      const rooms = await this.roomRepo.getRooms();
      const overlap = rooms.some( r => this.isOverlapWith( RoomMap.toDomain(r), RoomMap.toDomain(roomDTO) ) );

      if (overlap) {
        return Result.fail<IRoomDTO>("Room overlaps with another room on the floor.");
      }

      const roomOrError = await Room.create( roomDTO );

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }

      const roomResult = roomOrError.getValue();

      console.log("1 - ", roomResult);

      await this.roomRepo.save(roomResult);

      floor.addRoom(roomResult);

      await this.floorRepo.update(floor);

      building.addRoomToFloor(floor.floorId, roomResult);

      await this.buildingRepo.updateRooms(building);

      const roomDTOResult = RoomMap.toDTO( roomResult ) as IRoomDTO;
      return Result.ok<IRoomDTO>( roomDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {
      const exists = await this.roomRepo.findByRoomId(roomDTO.roomId);

      if (exists === null) {
        return Result.fail<IRoomDTO>("Room not found");
      }

      const roomOrError = await Room.create(roomDTO);

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }

      const roomResult = roomOrError.getValue();

      await this.roomRepo.update(roomResult);

      const roomDTOResult = RoomMap.toDTO(roomResult) as IRoomDTO;
      return Result.ok<IRoomDTO>(roomDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getRooms(): Promise<Result<IRoomDTO[]>> {
    try {
      const rooms = await this.roomRepo.getRooms();

      const roomDTOResult = rooms.map( room => RoomMap.toDTO( room ) as IRoomDTO );

      return Result.ok<IRoomDTO[]>( roomDTOResult );
    } catch (e) {
      throw e;
    }
  }

  public async deleteRoom(roomId: string): Promise<Result<boolean>> {
    try {
      const room = await this.roomRepo.findByRoomId(roomId);
      if (room === null) {
        return Result.fail<boolean>("Room not found");
      }
      else {
        await this.roomRepo.delete(roomId);
        return Result.ok<boolean>(true);
      }
    } catch (e) {
      throw e;
    }
  }

  public isOverlapWith(originalRoom: Room,otherRoom: Room): boolean {
    // Check if the rooms are on the same floor
    if (originalRoom.floorId !== otherRoom.floorId) {
      return false;
    }

    // Check if the rooms overlap in terms of coordinates
    const thisX1 = originalRoom.originCoordinateX;
    const thisY1 = originalRoom.originCoordinateY;
    const thisX2 = originalRoom.destinationCoordinateX;
    const thisY2 = originalRoom.destinationCoordinateY;

    const otherX1 = otherRoom.originCoordinateX;
    const otherY1 = otherRoom.originCoordinateY;
    const otherX2 = otherRoom.destinationCoordinateX;
    const otherY2 = otherRoom.destinationCoordinateY;

    const overlapX = thisX1 < otherX2 && thisX2 > otherX1;
    const overlapY = thisY1 < otherY2 && thisY2 > otherY1;

    return overlapX && overlapY;
  }
}