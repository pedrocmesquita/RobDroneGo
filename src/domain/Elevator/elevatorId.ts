import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard, IGuardResult } from "../../core/logic/Guard";

interface ElevatorIdProps {
  elevatorId: string;
}

export class ElevatorId extends ValueObject<ElevatorIdProps> {
  get elevatorId(): string {
    return this.props.elevatorId;
  }

  private constructor(props: ElevatorIdProps) {
    super(props);
  }

  public static create(props: ElevatorIdProps): Result<ElevatorId> {

    // Check if the attributes are not null or undefined
    const guardResult: IGuardResult = Guard.againstNullOrUndefined(props.elevatorId, 'elevatorId');

    if (!guardResult.succeeded) {
      return Result.fail<ElevatorId>(guardResult.message);
    }

    // Check if the elevatorId has a maximum of 5 alphanumeric characters and a space.
    if (!/^[a-zA-Z0-9 ]{1,5}$/.test(props.elevatorId)) {
      return Result.fail<ElevatorId>("ElevatorId must be a maximum of 5 alphanumeric characters and a space.");
    }

    return Result.ok<ElevatorId>(new ElevatorId(props));
  }
}
