import IFloorDTO from "../../../../src/dto/IFloorDTO";
import IElevatorDTO from "../../../../src/dto/IElevatorDTO";

export interface IBuilding{
  buildingId: string;
  buildingName: string;
  buildingDescription?: string;
  buildingNumberOfFloors: number;
  dimX: number;
  dimY: number;
  floors?: IFloorDTO[];
  elevators?: IElevatorDTO[];
}
