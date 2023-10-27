import { Mapper } from "../core/infra/Mapper";
import { Floor } from "../domain/Floor/floor";
import IFloorDTO from "../dto/IFloorDTO";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";
import { Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class FloorMap implements Mapper<Floor> {
    public static toDTO (floor: Floor): any {
        return {
            buildingId: floor.buildingId,
            floorId: floor.floorId,
            floorNumber: floor.floorNumber.floorNumber,
            floorDescription: floor.floorDescription.floorDescription
        } as IFloorDTO;
    } 

    public static toDomain (floor: any | Model<IFloorPersistence & Document>): Floor {
        const floorOrError = Floor.create(floor, new UniqueEntityID(floor.domainId));

        floorOrError.isFailure ? console.log(floorOrError.error) : '';

        return floorOrError.isSuccess ? floorOrError.getValue() : null;
    }

    public static toPersistence (floor: Floor): any {
        return {
            buildingId: floor.buildingId,
            floorId: floor.floorId,
            floorNumber: floor.floorNumber.floorNumber,
            floorDescription: floor.floorDescription.floorDescription
        };
    }
}