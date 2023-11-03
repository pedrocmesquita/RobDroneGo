import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard, IGuardResult } from "../../core/logic/Guard";

interface robotsIdProps {
    idRobot: string;
}

export class IdRobots extends ValueObject<robotsIdProps> {
    get idRobot(): string {
        return this.props.idRobot;
    }

    private constructor(props: robotsIdProps) {
        super(props);
    }

    public static create(props: robotsIdProps): Result<IdRobots> {

        // Check if the attributes are not null or undefined
        const guardResult: IGuardResult = Guard.againstNullOrUndefined(props.idRobot, 'IdRobot');

        if (!guardResult.succeeded) {
            return Result.fail<IdRobots>(guardResult.message);
        }

        // Check if the robotId has a maximum of 5 alphanumeric characters and a space.
        if (!/^[a-zA-Z0-9 ]{1,30}$/.test(props.idRobot)) {
            return Result.fail<IdRobots>('idRobot must have a maximum of 5 alphanumeric characters and a space.');
        }

        return Result.ok<IdRobots>(new IdRobots(props));
    }
}