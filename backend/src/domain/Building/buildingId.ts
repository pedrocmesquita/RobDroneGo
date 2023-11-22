import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard, IGuardResult } from "../../core/logic/Guard";

interface BuildingIdProps {
    buildingId: string;
}

export class BuildingId extends ValueObject<BuildingIdProps> {
    get buildingId(): string {
        return this.props.buildingId;
    }

    private constructor(props: BuildingIdProps) {
        super(props);
    }

    public static create(props: BuildingIdProps): Result<BuildingId> {

        // Check if the attributes are not null or undefined
        const guardResult: IGuardResult = Guard.againstNullOrUndefined(props.buildingId, 'buildingId');

        if (!guardResult.succeeded) {
            return Result.fail<BuildingId>(guardResult.message);
        }

        // Check if the buildingId has a maximum of 5 alphanumeric characters and a space.
        if (!/^[a-zA-Z0-9 ]{1,5}$/.test(props.buildingId)) {
            return Result.fail<BuildingId>('BuildingId must have a maximum of 5 alphanumeric characters and a space.');
        }

        return Result.ok<BuildingId>(new BuildingId(props));
    }
}


