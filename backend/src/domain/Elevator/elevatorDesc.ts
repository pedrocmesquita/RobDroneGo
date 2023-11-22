import { ValueObject} from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ElevatorDescProps {
  elevatorDesc: string;
}

export class ElevatorDesc extends ValueObject<ElevatorDescProps> {
  get elevatorDesc(): string {
    return this.props.elevatorDesc;
  }

  private constructor(props: ElevatorDescProps) {
    super(props);
  }

  public static create(props: ElevatorDescProps): Result<ElevatorDesc> {
    const guardResult = Guard.againstNullOrUndefined(props.elevatorDesc, "description");

    if (!guardResult.succeeded) {
      return Result.fail<ElevatorDesc>(guardResult.message);
    }

    // Check if the description has a maximum of 250 alphanumeric characters and a space.
    if (!/^[a-zA-Z0-9 ]{1,250}$/.test(props.elevatorDesc)) {
      return Result.fail<ElevatorDesc>("ElevatorDesc must have a maximum of 250 alphanumeric characters.");
    }

    return Result.ok<ElevatorDesc>(new ElevatorDesc(props));
  }
}