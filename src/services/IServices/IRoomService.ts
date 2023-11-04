import { Result } from "../../core/logic/Result";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IRoomService {
  createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
  getRoom(roomId: string): Promise<Result<IRoomDTO>>;
  getRooms(): Promise<Result<IRoomDTO[]>>;
  deleteRoom(roomId: string): Promise<Result<boolean>>;
  updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>>;
}