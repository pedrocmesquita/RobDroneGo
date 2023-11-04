import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RobotmodelProps {
  model: string;
}

export class Model extends ValueObject<RobotmodelProps> {
  get model(): string {
    return this.props.model;
  }

  private constructor(props: RobotmodelProps) {
    super(props);
  }

  public static create(props: RobotmodelProps): Result<Model> {
    const guardResult = Guard.againstNullOrUndefined(props.model, "Model");

    if (!guardResult.succeeded) {
      return Result.fail<Model>(guardResult.message);
    }

    // Check if the name has a maximum of 50 alphanumeric characters and a space.
    if (!/^[a-zA-Z0-9 ]{1,100}$/.test(props.model)) {
      return Result.fail<Model>("RobotModel must have a maximum of 50 characters.");
    }

    return Result.ok<Model>(new Model(props));
  }
}