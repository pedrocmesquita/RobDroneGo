
import { IConnection } from "./iconnection.model";
import { IRoom } from "./iroom.model";
import {IElevator} from "./ielevator.model";

export interface IFloor{
  buildingId: string;
  floorNumber: number;
  floorId?: string;
  floorDescription?: string;
  connections?: IConnection[];
  rooms?: IRoom[];
  elevators?: IElevator[];
}
