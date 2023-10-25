import { floor } from "lodash";
import { Building } from "./building";
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";


interface FloorProps {
    //floorId is a value object that is unique, and the first parts equals the building name and the second the floor number.
    buildingId: string;
    floorId: string;
    floorNumber: number;    
}

export class Floor extends ValueObject<FloorProps> {
    get buildingId (): string {
        return this.props.buildingId;
    }

    get floorId (): string {
        return this.props.floorId;
    }

    get floorNumber (): number {
        return this.props.floorNumber;
    }

    set buildingId (value: string) {
        this.props.buildingId = value;
    }

    set floorId (value: string) {
        this.props.floorId = value;
    }

    set floorNumber (value: number) {
        this.props.floorNumber = value;
    }

    private constructor (props: FloorProps) {
        super(props);
    }

    public static create (props: FloorProps): Result<Floor> {
        const floor = new Floor(props);

        return Result.ok<Floor>(floor);
    }
}
