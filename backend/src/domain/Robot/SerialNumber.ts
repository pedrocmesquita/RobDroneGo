import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotSerialNumberProps {
    serialNumber: string;
}

export class SerialNumber extends ValueObject<RobotSerialNumberProps> {
    get serialNumber(): string {
        return this.props.serialNumber;
    }

    private constructor(props: RobotSerialNumberProps) {
        super(props);
    }

    public static create(props: RobotSerialNumberProps): Result< SerialNumber > {
        const guardResult = Guard.againstNullOrUndefined(props.serialNumber, "serialNumber");

        if (!guardResult.succeeded) {
            return Result.fail<SerialNumber>(guardResult.message);
        }

        // Check if the name has a maximum of 50 alphanumeric characters and a space.
        if (!/^[a-zA-Z0-9 ]{1,50}$/.test(props.serialNumber)) {
            return Result.fail<SerialNumber>("RobotName must have a maximum of 50 characters.");
        }


        return Result.ok<SerialNumber>(new SerialNumber(props));
    }
}