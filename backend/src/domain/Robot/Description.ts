import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DescriptionProps {
    description: string;
}

export class Description extends ValueObject<DescriptionProps> {
    get description(): string {
        return this.props.description;
    }

    private constructor(props: DescriptionProps) {
        super(props);
    }

    public static create(props: DescriptionProps): Result<Description> {
        const guardResult = Guard.againstNullOrUndefined(props.description, "description");

        if (!guardResult.succeeded) {
            return Result.fail<Description>(guardResult.message);
        }

        // Check if the name has a maximum of 50 alphanumeric characters and a space.
        if (!/^[a-zA-Z0-9 ]{1,50}$/.test(props.description)) {
            return Result.fail<Description>("description must have a maximum of 50 characters.");
        }

        return Result.ok<Description>(new Description(props));
    }
}