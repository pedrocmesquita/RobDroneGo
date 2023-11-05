import { ValueObject} from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard, IGuardResult } from "../../core/logic/Guard";

interface ElevatorBrandProps {
  elevatorBrand: string;
}

export class ElevatorBrand extends ValueObject<ElevatorBrandProps> {
  get elevatorBrand(): string {
    return this.props.elevatorBrand;
  }

  private constructor(props: ElevatorBrandProps) {
    super(props);
  }

  public static create(props: ElevatorBrandProps): Result<ElevatorBrand> {
    const guardResult = Guard.againstNullOrUndefined(props.elevatorBrand, 'elevatorBrand');

    if (!guardResult.succeeded) {
      return Result.fail<ElevatorBrand>(guardResult.message);
    }

    // Check if the brand has a maximum of 50 alphanumeric characters and a space.
    if (!/^[a-zA-Z0-9 ]{1,250}$/.test(props.elevatorBrand)) {
      return Result.fail<ElevatorBrand>("ElevatorBrand must have a maximum of 50 alphanumeric characters.");
    }

    return Result.ok<ElevatorBrand>(new ElevatorBrand(props));
  }
}