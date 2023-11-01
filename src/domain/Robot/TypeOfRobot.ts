import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard, IGuardResult } from "../../core/logic/Guard";

interface typeOfRobotsProps {
    typeOfRobots: string;
}

export class TypeOfRobots extends ValueObject<typeOfRobotsProps> {
    get typeOfRobots(): string {
        return this.props.typeOfRobots;
    }

    private constructor(props: typeOfRobotsProps) {
        super(props);
    }

    public static create(props: typeOfRobotsProps): Result<TypeOfRobots> {

        // Check if the attributes are not null or undefined
        const guardResult: IGuardResult = Guard.againstNullOrUndefined(props.typeOfRobots, 'typeOfRobots');

        if (!guardResult.succeeded) {
            return Result.fail<TypeOfRobots>(guardResult.message);
        }

        // Check if the buildingId has a maximum of 5 alphanumeric characters and a space.
        if (!/^[a-zA-Z0-9 ]{1,25}$/.test(props.typeOfRobots)) {
            return Result.fail<TypeOfRobots>('idRobot must have a maximum of 5 alphanumeric characters and a space.');
        }

        return Result.ok<TypeOfRobots>(new TypeOfRobots(props));
    }
}