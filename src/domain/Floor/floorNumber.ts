import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";
import {Building} from "../Building/building";
import { BuildingNumberOfFloors } from "../Building/buildingNumberOfFloors";

interface FloorNumberProps {
    floorNumber: number;
}

export class FloorNumber extends ValueObject<FloorNumberProps> {
    get floorNumber(): number {
        return this.props.floorNumber;
    }

    private constructor(props: FloorNumberProps) {
        super(props);
    }

    public static create(props: FloorNumberProps): Result<FloorNumber> {
        const guardResult = Guard.againstNullOrUndefined(props.floorNumber, 'floorNumber');
        const building = Building;

        if (!guardResult.succeeded) {
            return Result.fail<FloorNumber>(guardResult.message);
        }

        // Check if the floorNumber is between -100 and 500
        if (props.floorNumber < -100 || props.floorNumber > 500) {
            return Result.fail<FloorNumber>('The floorNumber must be between -100 and 500.');
        }

        return Result.ok<FloorNumber>(new FloorNumber(props));
    }
}