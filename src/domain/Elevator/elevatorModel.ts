import { ValueObject} from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ElevatorModelProps {
  elevatorModel: string;
}

export class ElevatorModel extends ValueObject<ElevatorModelProps> {
  get elevatorModel(): string {
    return this.props.elevatorModel;
  }

  private constructor(props: ElevatorModelProps) {
    super(props);
  }

  public static create(props: ElevatorModelProps): Result<ElevatorModel> {
    const guardResult = Guard.againstNullOrUndefined(props.elevatorModel, "model");

    if (!guardResult.succeeded) {
      return Result.fail<ElevatorModel>(guardResult.message);
    }

    // Check if the model has a maximum of 50 alphanumeric characters and a space.
    if (!/^[a-zA-Z0-9 ]{1,250}$/.test(props.elevatorModel)) {
      return Result.fail<ElevatorModel>("ElevatorModel must have a maximum of 50 alphanumeric characters.");
    }

    return Result.ok<ElevatorModel>(new ElevatorModel(props));
  }
}