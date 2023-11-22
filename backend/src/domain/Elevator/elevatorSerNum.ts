import { ValueObject} from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ElevatorSerNumProps {
  elevatorSerNum: string;
}

export class ElevatorSerNum extends ValueObject<ElevatorSerNumProps> {
  get elevatorSerNum(): string {
    return this.props.elevatorSerNum;
  }

  private constructor(props: ElevatorSerNumProps) {
    super(props);
  }

  public static create(props: ElevatorSerNumProps): Result<ElevatorSerNum> {
    const guardResult = Guard.againstNullOrUndefined(props.elevatorSerNum, "serial number");

    if (!guardResult.succeeded) {
      return Result.fail<ElevatorSerNum>(guardResult.message);
    }

    // Check if the serial number has a maximum of 50 alphanumeric characters and a space.
    if (!/^[a-zA-Z0-9 ]{1,250}$/.test(props.elevatorSerNum)) {
      return Result.fail<ElevatorSerNum>("ElevatorSerNum must have a maximum of 50 alphanumeric characters.");
    }

    return Result.ok<ElevatorSerNum>(new ElevatorSerNum(props));
  }
}