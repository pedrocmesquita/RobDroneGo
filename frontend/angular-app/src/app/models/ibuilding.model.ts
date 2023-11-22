
import { IFloor } from "./ifloor.model";

export interface IBuilding {
  buildingId: string;
  buildingName: string;
  buildingDescription?: string;
  buildingNumberOfFloors: number;
  dimX: number;
  dimY: number;
  wallHeight: number;
  wallWidth: number;
  floors?: IFloor[];
}
