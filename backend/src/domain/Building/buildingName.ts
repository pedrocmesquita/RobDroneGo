import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface BuildingNameProps {
  buildingName: string;
}

export class BuildingName extends ValueObject<BuildingNameProps> {
  get buildingName(): string {
    return this.props.buildingName;
  }

  private constructor(props: BuildingNameProps) {
    super(props);
  }

  public static create(props: BuildingNameProps): Result<BuildingName> {
    const guardResult = Guard.againstNullOrUndefined(props.buildingName, "name");

    if (!guardResult.succeeded) {
      return Result.fail<BuildingName>(guardResult.message);
    }

    // Check if the name has a maximum of 50 alphanumeric characters and a space.
    if (!/^[a-zA-Z0-9 ]{1,50}$/.test(props.buildingName)) {
      return Result.fail<BuildingName>("BuildingName must have a maximum of 50 characters.");
    }

    return Result.ok<BuildingName>(new BuildingName(props));
  }
}