import { Mapper } from "../core/infra/Mapper";
import { Elevator } from "../domain/Elevator/elevator";
import IElevatorDTO from "../dto/IElevatorDTO";
import { Floor } from "../domain/Floor/floor";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Model } from "mongoose";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";
import { IElevatorPersistence } from "../dataschema/IElevatorPersistence";

export class ElevatorMap implements Mapper<Elevator> {
    public static toDTO (elevator: Elevator): any {
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
        } as IElevatorDTO;
    } 

    public static toDomain (elevator: any | Model<IElevatorPersistence & Document>): Elevator {
        const elevatorOrError = Elevator.create(elevator, new UniqueEntityID(elevator.domainId));

        elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

        return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
    }

    public static toPersistence (elevator: Elevator): any {
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
    }
}