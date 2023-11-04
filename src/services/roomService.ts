import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IRoomService from './IServices/IRoomService';
import IRoomRepo from '../services/IRepos/IRoomRepo';
import IRoomDTO from '../dto/IRoomDTO';
import { RoomMap } from "../mappers/RoomMap";
import { Room } from '../domain/Room/room';
import IFloorRepo from "./IRepos/IFloorRepo";

@Service()
export default class RoomService implements IRoomService {
  constructor(
    @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
    @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
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

      // Check if floorFrom exists and if floorTo exists
      if (floor === null) {
        return Result.fail<IRoomDTO>("Floor not found.");
      }

      const room = await this.roomRepo.findByRoomId(roomDTO.roomId);

      if (room != null) {
        return Result.fail<IRoomDTO>("Room already exists.");
      }

      const roomOrError = await Room.create( roomDTO );

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }

      const roomResult = roomOrError.getValue();

      console.log("1 - ", roomResult);

      await this.roomRepo.save(roomResult);

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
}