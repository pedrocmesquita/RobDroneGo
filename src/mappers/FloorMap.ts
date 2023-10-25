import { Mapper } from "../core/infra/Mapper";
import { Floor } from "../domain/Building/floor";
import IFloorDTO from "../dto/IFloorDTO";

export class FloorMap implements Mapper<Floor> {
    public static toDTO (floor: Floor): any {
        return {
            buildingId: floor.buildingId,
            floorId: floor.floorId,
            floorNumber: floor.floorNumber
        } as IFloorDTO;
    } 

    public static toDomain (raw: any): Floor {
        const floorOrError = Floor.create({
            buildingId: raw.buildingId,
            floorId: raw.floorId,
            floorNumber: raw.floorNumber
        });

        floorOrError.isFailure ? console.log(floorOrError.error) : '';

        return floorOrError.isSuccess ? floorOrError.getValue() : null;
    }

    public static toPersistence (floor: Floor): any {
        return {
            buildingId: floor.buildingId,
            floorId: floor.floorId,
            floorNumber: floor.floorNumber
        };
    }
}