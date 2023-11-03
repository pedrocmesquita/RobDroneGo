import IConnectionDTO from "./IConnectionDTO";

export default interface IFloorDTO {
    buildingId: string;
    floorNumber: number;
    floorId: string;
    floorDescription?: string;
    connections?: IConnectionDTO[];
}
