import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface LevelProps {
  name: string;
}

export class Level extends ValueObject<LevelProps> {
  get name (): string {
    return this.props.name;
  }

  private constructor (props: LevelProps) {
    super(props);
  }

  public static create (levelProps: LevelProps): Result<Level> {
    return Result.ok<Level>(new Level(levelProps));
  }
}