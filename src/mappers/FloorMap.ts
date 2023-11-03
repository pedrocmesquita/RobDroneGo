import { Mapper } from "../core/infra/Mapper";
import { Floor } from "../domain/Floor/floor";
import IFloorDTO from "../dto/IFloorDTO";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";
import { Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IConnectionDTO from "../dto/IConnectionDTO";

export class FloorMap implements Mapper<Floor> {
    public static toDTO (floor: Floor): any {

        const connections = floor.connections;

        if (Array.isArray(connections)) {
        return {
            buildingId: floor.buildingId,
            floorId: floor.floorId,
            floorNumber: floor.floorNumber.floorNumber,
            floorDescription: floor.floorDescription.floorDescription,
            connections: connections.map(connection => {
                return {
                    connectionId: connection.connectionId,
                    buildingfromId: connection.buildingfromId,
                    buildingtoId: connection.buildingtoId,
                    floorfromId: connection.floorfromId,
                    floortoId: connection.floortoId,
                    locationX: connection.locationX,
                    locationY: connection.locationY,
                    locationToX: connection.locationToX,
                    locationToY: connection.locationToY
                };
            }
            )
        } as IFloorDTO;
    } else {

            return {
                buildingId: floor.buildingId,
                floorId: floor.floorId,
                floorNumber: floor.floorNumber.floorNumber,
                floorDescription: floor.floorDescription.floorDescription,
                connections: [] // or another default value as needed
            } as IFloorDTO;
            }
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
            floorDescription: floor.floorDescription.floorDescription,
            connections: floor.connections.map(connection => {
                return {
                    connectionId: connection.connectionId,
                    buildingfromId: connection.buildingfromId,
                    buildingtoId: connection.buildingtoId,
                    floorfromId: connection.floorfromId,
                    floortoId: connection.floortoId,
                    locationX: connection.locationX,
                    locationY: connection.locationY,
                    locationToX: connection.locationToX,
                    locationToY: connection.locationToY
                };
            })
        };
    }
}