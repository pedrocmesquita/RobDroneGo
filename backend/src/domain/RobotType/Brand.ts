import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotBrandProps {
  brand: string;
}

export class Brand extends ValueObject<RobotBrandProps> {
  get brand(): string {
    return this.props.brand;
  }

  private constructor(props: RobotBrandProps) {
    super(props);
  }

  public static create(props: RobotBrandProps): Result<Brand> {
    const guardResult = Guard.againstNullOrUndefined(props.brand, "brand");

    if (!guardResult.succeeded) {
      return Result.fail<Brand>(guardResult.message);
    }

    // Check if the name has a maximum of 50 alphanumeric characters and a space.
    if (!/^[a-zA-Z0-9 ]{1,50}$/.test(props.brand)) {
      return Result.fail<Brand>("RobotBrand must have a maximum of 50 characters.");
    }

    return Result.ok<Brand>(new Brand(props));
  }
}