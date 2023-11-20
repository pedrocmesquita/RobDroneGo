import IFloorDTO from "../../../../src/dto/IFloorDTO";
import IElevatorDTO from "../../../../src/dto/IElevatorDTO";
import { IFloor } from "./ifloor.model";
import IElevator from "./ielevator.model";

export interface IBuilding {
  buildingId: string;
  buildingName: string;
  buildingDescription?: string;
  buildingNumberOfFloors: number;
  dimX: number;
  dimY: number;
  floors?: IFloor[];
}
