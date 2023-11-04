import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard, IGuardResult } from "../../core/logic/Guard";

interface robotIdProps {
    typeId: string;
}

export class TypeId extends ValueObject<robotIdProps> {
    get typeId(): string {
        return this.props.typeId;
    }

    private constructor(props: robotIdProps) {
        super(props);
    }

    public static create(props: robotIdProps): Result<TypeId> {

        // Check if the attributes are not null or undefined
        const guardResult: IGuardResult = Guard.againstNullOrUndefined(props.typeId, 'typeID');

        if (!guardResult.succeeded) {
            return Result.fail<TypeId>(guardResult.message);
        }

        // Check if the buildingId has a maximum of 5 alphanumeric characters and a space.
        if (!/^[a-zA-Z0-9 ]{1,5}$/.test(props.typeId)) {
            return Result.fail<TypeId>('RobotId must have a maximum of 5 alphanumeric characters and a space.');
        }

        return Result.ok<TypeId>(new TypeId(props));
    }
}


