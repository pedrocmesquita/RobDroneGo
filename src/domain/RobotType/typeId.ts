import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard, IGuardResult } from "../../core/logic/Guard";

interface robotIdProps {
    typeId: string;
}

export class TypeID extends ValueObject<robotIdProps> {
    get typeId(): string {
        return this.props.typeId;
    }

    private constructor(props: robotIdProps) {
        super(props);
    }

    public static create(props: robotIdProps): Result<TypeID> {

        // Check if the attributes are not null or undefined
        const guardResult: IGuardResult = Guard.againstNullOrUndefined(props.typeId, 'typeID');

        if (!guardResult.succeeded) {
            return Result.fail<TypeID>(guardResult.message);
        }

        // Check if the buildingId has a maximum of 5 alphanumeric characters and a space.
        if (!/^[a-zA-Z0-9 ]{1,5}$/.test(props.typeId)) {
            return Result.fail<TypeID>('RobotId must have a maximum of 5 alphanumeric characters and a space.');
        }

        return Result.ok<TypeID>(new TypeID(props));
    }
}


