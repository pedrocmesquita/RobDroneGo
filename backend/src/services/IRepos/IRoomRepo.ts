import { Repo } from "../../core/infra/Repo";
import { Room } from "../../domain/Room/room";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
export default interface IRoomRepo extends Repo<Room> {
  save(room: Room): Promise<Room>;
  findByRoomId(roomId: UniqueEntityID | string): Promise<Room>;
  update(room: Room): Promise<Room>;
  delete(roomId: string): void;
  getRooms(): Promise<Room[]>;
  deleteAllRoomsFromFloor(floorId: string): void;
  findRoomsByFloorId(floorId: string): Promise<Room[]>;
}