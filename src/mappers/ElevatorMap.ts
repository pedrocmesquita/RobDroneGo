import { Mapper } from "../core/infra/Mapper";
import { Elevator } from "../domain/Building/elevator";
import IElevatorDTO from "../dto/iElevatorDTO";

export class ElevatorMap implements Mapper<Elevator> {
    public static toDTO (elevator: Elevator): any {
        return {
            buildingId: elevator.buildingId,
            elevatorId: elevator.elevatorId,
            currentFloor: elevator.currentFloor,
            locationX: elevator.locationX,
            locationY: elevator.locationY
        } as IElevatorDTO;
    } 

    public static toDomain (raw: any): Elevator {
        const elevatorOrError = Elevator.create({
            buildingId: raw.buildingId,
            elevatorId: raw.elevatorId,
            currentFloor: raw.currentFloor,
            locationX: raw.locationX,
            locationY: raw.locationY
        });

        elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

        return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
    }

    public static toPersistence (elevator: Elevator): any {
        return {
            buildingId: elevator.buildingId,
            elevatorId: elevator.elevatorId,
            currentFloor: elevator.currentFloor,
            locationX: elevator.locationX,
            locationY: elevator.locationY
        };
    }
}