import { ValueObject} from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface BuildingDescriptionProps {
    buildingDescription: string;
}

export class BuildingDescription extends ValueObject<BuildingDescriptionProps> {
    get buildingDescription(): string {
        return this.props.buildingDescription;
    }

    private constructor(props: BuildingDescriptionProps) {
        super(props);
    }

    public static create(props: BuildingDescriptionProps): Result<BuildingDescription> {
        const guardResult = Guard.againstNullOrUndefined(props.buildingDescription, "description");

        if (!guardResult.succeeded) {
            return Result.fail<BuildingDescription>(guardResult.message);
        }

        // Check if the description has a maximum of 255 alphanumeric characters and a space.
        if (!/^[a-zA-Z0-9 ]{1,255}$/.test(props.buildingDescription)) {
            return Result.fail<BuildingDescription>("BuildingDescription must have a maximum of 50 alphanumeric characters and a space.");
        }

        return Result.ok<BuildingDescription>(new BuildingDescription(props));
    }
}