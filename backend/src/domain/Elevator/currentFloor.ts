import { ValueObject} from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CurrentFloorProps {
  currentFloor: number;
}

export class CurrentFloor extends ValueObject<CurrentFloorProps> {
  get currentFloor(): number {
    return this.props.currentFloor;
  }

  private constructor(props: CurrentFloorProps) {
    super(props);
  }

  public static create(props: CurrentFloorProps): Result<CurrentFloor> {
    const guardResult = Guard.againstNullOrUndefined(props.currentFloor, "currentFloor");

    if (!guardResult.succeeded) {
      return Result.fail<CurrentFloor>(guardResult.message);
    }

    // Check if the brand has a maximum of 50 alphanumeric characters and a space.
    if (props.currentFloor < 0 || props.currentFloor > 10) {
      return Result.fail<CurrentFloor>("currentFloor must have a maximum of 2 numbers.");
    }

    return Result.ok<CurrentFloor>(new CurrentFloor(props));
  }
}