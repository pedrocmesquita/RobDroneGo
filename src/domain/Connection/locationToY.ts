import { ValueObject} from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface locationToYProps {
  locationToY: number;
}

export class LocationToY extends ValueObject<locationToYProps> {
  get locationToY(): number {
    return this.props.locationToY;
  }

  private constructor(props: locationToYProps) {
    super(props);
  }

  public static create(props: locationToYProps): Result<LocationToY> {
    const guardResult = Guard.againstNullOrUndefined(props.locationToY, "locationToY");

    if (!guardResult.succeeded) {
      return Result.fail<LocationToY>(guardResult.message);
    }

    // Check if the brand has a maximum of 50 alphanumeric characters and a space.
    if (!/^[0-9 ]{1,3}$/.test(String(props.locationToY))) {
      return Result.fail<LocationToY>("locationToY must have a maximum of 3 numbers.");
    }

    return Result.ok<LocationToY>(new LocationToY(props));
  }
}