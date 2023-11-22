import { ValueObject} from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface locationToXProps {
  locationToX: number;
}

export class LocationToX extends ValueObject<locationToXProps> {
  get locationToX(): number {
    return this.props.locationToX;
  }

  private constructor(props: locationToXProps) {
    super(props);
  }

  public static create(props: locationToXProps): Result<LocationToX> {
    const guardResult = Guard.againstNullOrUndefined(props.locationToX, "locationToX");

    if (!guardResult.succeeded) {
      return Result.fail<LocationToX>(guardResult.message);
    }

    // Check if the brand has a maximum of 50 alphanumeric characters and a space.
    if (!/^[0-9 ]{1,3}$/.test(String(props.locationToX))) {
      return Result.fail<LocationToX>("locationToX must have a maximum of 3 numbers.");
    }

    return Result.ok<LocationToX>(new LocationToX(props));
  }
}