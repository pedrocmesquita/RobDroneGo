import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface BuildingProps {
  name: string;
}

export class BuildingId extends ValueObject<BuildingProps> {
  get name (): string {
    return this.props.name;
  }

  private constructor (props: BuildingProps) {
    super(props);
  }

  public static create (buildingProps: BuildingProps): Result<BuildingId> {
    return Result.ok<BuildingId>(new BuildingId(buildingProps));
  }
}