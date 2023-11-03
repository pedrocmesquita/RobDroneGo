import { Mapper } from "../core/infra/Mapper";
import { Building } from "../domain/Building/building";
import IBuildingDTO from "../dto/IBuildingDTO";
import { IBuildingPersistence } from "../dataschema/IBuildingPersistence";
import { Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IFloorDTO from "../dto/IFloorDTO";
import IConnectionDTO from "../dto/IConnectionDTO";


export class BuildingMap implements Mapper<Building> {
    public static toDTO(building: Building): any {
        const floors = building.floors;

        if (Array.isArray(floors)) {
            return {
                buildingId: building.buildingId.buildingId,
                buildingName: building.buildingName.buildingName,
                buildingDescription: building.buildingDescription.buildingDescription,
                buildingNumberOfFloors: building.buildingNumberOfFloors.buildingNumberOfFloors,
                floors: floors.map(floor => {
                    return {
                        buildingId: floor.buildingId,
                        floorId: floor.floorId,
                        floorNumber: floor.floorNumber.floorNumber,
                        floorDescription: floor.floorDescription.floorDescription,
                        floorConnections: floor.connections.map(connection => {
                            return {
                                connectionId: connection.connectionId,
                                buildingFromId: connection.buildingfromId,
                                buildingToId: connection.buildingtoId,
                                floorFromId: connection.floorfromId,
                                floorToId: connection.floortoId,
                                locationX: connection.locationX,
                                locationY: connection.locationY,
                                locationToX: connection.locationToX,
                                locationToY: connection.locationToY,
                            };
                        }
                        )
                    };
                }
                )
            } as IBuildingDTO;
        } else {
            // Handle the case where 'floors' is not an array
            return {
                buildingId: building.buildingId.buildingId,
                buildingName: building.buildingName.buildingName,
                buildingDescription: building.buildingDescription.buildingDescription,
                buildingNumberOfFloors: building.buildingNumberOfFloors.buildingNumberOfFloors,
                floors: [] // or another default value as needed
            } as IBuildingDTO;
        }
    }


    public static toDomain (building: any | Model<IBuildingPersistence & Document>): Building {
        const buildingOrError = Building.create(building, new UniqueEntityID(building.domainId));

        buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

        return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
    }

    public static toPersistence (building: Building): any {
        return {
            buildingId: building.buildingId.buildingId,
            buildingName: building.buildingName.buildingName,
            buildingNumberOfFloors: building.buildingNumberOfFloors.buildingNumberOfFloors,
            buildingDescription: building.buildingDescription.buildingDescription,
            floors: building.floors.map(floor => {
                return {
                    buildingId: floor.buildingId,
                    floorId: floor.floorId,
                    floorNumber: floor.floorNumber.floorNumber,
                    floorDescription: floor.floorDescription.floorDescription,
                    floorConnections: floor.connections.map(connection => {
                        return {
                            connectionId: connection.connectionId,
                            buildingFromId: connection.buildingfromId,
                            buildingToId: connection.buildingtoId,
                            floorFromId: connection.floorfromId,
                            floorToId: connection.floortoId,
                            locationX: connection.locationX,
                            locationY: connection.locationY,
                            locationToX: connection.locationToX,
                            locationToY: connection.locationToY,
                        };
                    })
                };
            })
        };
    }
}
