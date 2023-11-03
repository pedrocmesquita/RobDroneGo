import { ValueObject} from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface locationXProps {
  locationX: number;
}

export class LocationX extends ValueObject<locationXProps> {
  get locationX(): number {
    return this.props.locationX;
  }

  private constructor(props: locationXProps) {
    super(props);
  }

  public static create(props: locationXProps): Result<LocationX> {

    const guardResult = Guard.againstNullOrUndefined(props.locationX, "locationX");

    if (!guardResult.succeeded) {
      return Result.fail<LocationX>(guardResult.message);
    }
    // Check if the brand has a maximum of 50 alphanumeric characters and a space.
    if (!/^[0-9 ]{1,3}$/.test(String(props.locationX))) {
      return Result.fail<LocationX>("locationX must have a maximum of 3 numbers.");
    }

    return Result.ok<LocationX>(new LocationX(props));
  }
}