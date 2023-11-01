import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import robotRepo from "../../repos/robotRepo";

interface RobotNameProps {
    robotName: string;
}

export class NameRobots extends ValueObject<RobotNameProps> {
    get robotName(): string {
        return this.props.robotName;
    }

    private constructor(props: RobotNameProps) {
        super(props);
    }

    public static  create(props: RobotNameProps): Result <NameRobots> {
        const guardResult = Guard.againstNullOrUndefined(props.robotName, "robotName");

        if (!guardResult.succeeded) {
            return Result.fail<NameRobots>(guardResult.message);
        }

        // Check if the name has a maximum of 50 alphanumeric characters and a space.
        if (!/^[a-zA-Z0-9 ]{1,30}$/.test(props.robotName)) {
            return Result.fail<NameRobots>("RobotName must have a maximum of 50 characters.");
        }


        return Result.ok<NameRobots>(new NameRobots(props));
    }
}