import { ValueObject} from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface locationYProps {
  locationY: number;
}

export class LocationY extends ValueObject<locationYProps> {
  get locationY(): number {
    return this.props.locationY;
  }

  private constructor(props: locationYProps) {
    super(props);
  }

  public static create(props: locationYProps): Result<LocationY> {
    const guardResult = Guard.againstNullOrUndefined(props.locationY, "locationY");

    if (!guardResult.succeeded) {
      return Result.fail<LocationY>(guardResult.message);
    }

    // Check if the brand has a maximum of 50 alphanumeric characters and a space.
    if (!/^[0-9 ]{1,3}$/.test(String(props.locationY))) {
      return Result.fail<LocationY>("locationY must have a maximum of 3 numbers.");
    }

    return Result.ok<LocationY>(new LocationY(props));
  }
}