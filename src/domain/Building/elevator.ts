import { Building } from "./building";
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { shallowEqual } from "shallow-equal-object";


interface ElevatorProps {
    buildingId: string;
    elevatorId: string;
    currentFloor: number;
    locationX: number;
    locationY: number;
}

export class Elevator extends ValueObject<ElevatorProps> {
    get buildingId (): string {
        return this.props.buildingId;
    }
    get elevatorId (): string {
        return this.props.elevatorId;
    }
    get currentFloor (): number {
        return this.props.currentFloor;
    }
    get locationX (): number {
        return this.props.locationX;
    }
    get locationY (): number {
        return this.props.locationY;
    }

    set buildingId (value: string) {
        this.props.buildingId = value;
    }
    set elevatorId (value: string) {
        this.props.elevatorId = value;
    }
    set currentFloor (value: number) {
        this.props.currentFloor = value;
    }
    set locationX (value: number) {
        this.props.locationX = value;
    }
    set locationY (value: number) {
        this.props.locationY = value;
    }
    

    private constructor (props: ElevatorProps) {
        super(props);
    }

    public static create (props: ElevatorProps): Result<Elevator> {
        const elevator = new Elevator(props);

        return Result.ok<Elevator>(elevator);
    }
}

