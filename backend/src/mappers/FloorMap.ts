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
        const rooms = floor.rooms;

        if (Array.isArray(rooms)) {
        if (Array.isArray(connections)) {
        return {
            buildingId: floor.buildingId,
            floorId: floor.floorId,
            floorNumber: floor.floorNumber.floorNumber,
            floorDescription: floor.floorDescription.floorDescription,
            width: floor.width,
            height: floor.height,
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
            ),
            rooms: rooms.map(room => {
                return {
                    roomId: room.roomId,
                    floorId: room.floorId,
                    roomName: room.roomName.roomName,
                    roomDescription: room.roomDescription.roomDescription,
                    roomCategory: room.roomCategory.category,
                    doorX: room.door.doorX,
                    doorY: room.door.doorY,
                    originCoordinateX: room.originCoordinateX,
                    originCoordinateY: room.originCoordinateY,
                    destinationCoordinateX: room.destinationCoordinateX,
                    destinationCoordinateY: room.destinationCoordinateY,
                };
            }),
            elevators: floor.elevators.map(elevator => {
                return {
                    elevatorId: elevator.elevatorId.elevatorId,
                    floorsAttended: elevator.floorsAttended,
                    elevatorBrand: elevator.elevatorBrand.elevatorBrand,
                    elevatorModel: elevator.elevatorModel.elevatorModel,
                    elevatorSerNum: elevator.elevatorSerNum.elevatorSerNum,
                    elevatorDesc: elevator.elevatorDesc.elevatorDesc,
                    currentFloor: elevator.currentFloor.currentFloor,
                    locationX: elevator.locationX.locationX,
                    locationY: elevator.locationY.locationY
                };
            })
        } as IFloorDTO;
    } else {
            return {
                buildingId: floor.buildingId,
                floorId: floor.floorId,
                floorNumber: floor.floorNumber.floorNumber,
                floorDescription: floor.floorDescription.floorDescription,
                width: floor.width,
                height: floor.height,
                connections: [], // or another default value as needed
                rooms: rooms.map(room => {
                    return {
                        roomId: room.roomId,
                        floorId: room.floorId,
                        roomName: room.roomName.roomName,
                        roomDescription: room.roomDescription.roomDescription,
                        roomCategory: room.roomCategory.category,
                        doorX: room.door.doorX,
                        doorY: room.door.doorY,
                        originCoordinateX: room.originCoordinateX,
                        originCoordinateY: room.originCoordinateY,
                        destinationCoordinateX: room.destinationCoordinateX,
                        destinationCoordinateY: room.destinationCoordinateY,
                    };
                }),
                elevators: floor.elevators.map(elevator => {
                    return {
                        elevatorId: elevator.elevatorId.elevatorId,
                        floorsAttended: elevator.floorsAttended,
                        elevatorBrand: elevator.elevatorBrand.elevatorBrand,
                        elevatorModel: elevator.elevatorModel.elevatorModel,
                        elevatorSerNum: elevator.elevatorSerNum.elevatorSerNum,
                        elevatorDesc: elevator.elevatorDesc.elevatorDesc,
                        currentFloor: elevator.currentFloor.currentFloor,
                        locationX: elevator.locationX.locationX,
                        locationY: elevator.locationY.locationY
                    };
                })
            } as IFloorDTO;
            }
        } else {
            if (Array.isArray(connections)) {
                return {
                    buildingId: floor.buildingId,
                    floorId: floor.floorId,
                    floorNumber: floor.floorNumber.floorNumber,
                    floorDescription: floor.floorDescription.floorDescription,
                    width: floor.width,
                    height: floor.height,
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
                    }),
                    rooms: [], // or another default value as needed
                    elevators: floor.elevators.map(elevator => {
                        return {
                            elevatorId: elevator.elevatorId.elevatorId,
                            floorsAttended: elevator.floorsAttended,
                            elevatorBrand: elevator.elevatorBrand.elevatorBrand,
                            elevatorModel: elevator.elevatorModel.elevatorModel,
                            elevatorSerNum: elevator.elevatorSerNum.elevatorSerNum,
                            elevatorDesc: elevator.elevatorDesc.elevatorDesc,
                            currentFloor: elevator.currentFloor.currentFloor,
                            locationX: elevator.locationX.locationX,
                            locationY: elevator.locationY.locationY
                        };
                    })
                } as IFloorDTO;
            }
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
            width: floor.width,
            height: floor.height,
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
            }),
            rooms: floor.rooms.map(room => {
                return {
                    roomId: room.roomId,
                    floorId: room.floorId,
                    roomName: room.roomName.roomName,
                    roomDescription: room.roomDescription.roomDescription,
                    roomCategory: room.roomCategory.category,
                    doorX: room.door.doorX,
                    doorY: room.door.doorY,
                    originCoordinateX: room.originCoordinateX,
                    originCoordinateY: room.originCoordinateY,
                    destinationCoordinateX: room.destinationCoordinateX,
                    destinationCoordinateY: room.destinationCoordinateY,
                };
            })
        };
    }
}