import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface FloorDescriptionProps {
    floorDescription: string;
}

export class FloorDescription extends ValueObject<FloorDescriptionProps> {
    get floorDescription (): string {
        return this.props.floorDescription;
    }

    private constructor (props: FloorDescriptionProps) {
        super(props);
    }

    public static create (props: FloorDescriptionProps): Result<FloorDescription> {
        const guardResult = Guard.againstNullOrUndefined(props.floorDescription, 'description');

        if (!guardResult.succeeded) {
            return Result.fail<FloorDescription>(guardResult.message);
        }

        // Check if the description has less than 255 alphanumeric characters
        if (!/^[a-zA-Z0-9 ]{1,255}$/.test(props.floorDescription)) {
            return Result.fail<FloorDescription>("The description has more than 255 alphanumeric characters.");
        }

        return Result.ok<FloorDescription>(new FloorDescription(props));
    }
}