import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface BuildingNumberOfFloorsProps {
    buildingNumberOfFloors: number;
}

export class BuildingNumberOfFloors extends ValueObject<BuildingNumberOfFloorsProps> {
    get buildingNumberOfFloors (): number {
        return this.props.buildingNumberOfFloors;
    }

    private constructor (props: BuildingNumberOfFloorsProps) {
        super(props);
    }

    public static create (props: BuildingNumberOfFloorsProps): Result<BuildingNumberOfFloors> {
        const guardResult = Guard.againstNullOrUndefined(props.buildingNumberOfFloors, "numberOfFloors");

        if (!guardResult.succeeded) {
            return Result.fail<BuildingNumberOfFloors>(guardResult.message);
        }

        // Check if the numberOfFloors is less than 500
        if (props.buildingNumberOfFloors < 0 || props.buildingNumberOfFloors > 500) {
            return Result.fail<BuildingNumberOfFloors>("The numberOfFloors must be between 0 and 500.");
        }

        return Result.ok<BuildingNumberOfFloors>(new BuildingNumberOfFloors(props));
    }
}

