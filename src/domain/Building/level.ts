import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { BuildingId } from "./buildingId";


// When we create a level, we need to specify a buildingId, and a name.

interface LevelProps {
  name: string;
  buildingId: BuildingId;
}

export class Level extends ValueObject<LevelProps> {
  get name(): string {
    return this.props.name;
  }

  get buildingId(): BuildingId {
    return this.props.buildingId;
  }

  private constructor(props: LevelProps) {
    super(props);
  }

  public static create(levelProps: LevelProps): Result<Level> {

    if (!levelProps.name) {
      return Result.fail<Level>("Level name is required.");
    }

    if (!levelProps.buildingId) {
      return Result.fail<Level>("Building ID is required.");
    }

    return Result.ok<Level>(new Level(levelProps));
  }
}

