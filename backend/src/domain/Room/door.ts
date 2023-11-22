import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface DoorProps {
  doorX: number;
  doorY: number;
}

export class Door extends ValueObject<DoorProps> {
  get doorX (): number {
    return this.props.doorX;
  }

  get doorY (): number {
    return this.props.doorY;
  }

  private constructor (props: DoorProps) {
    super(props);
  }

  public static create (props: DoorProps): Result<Door> {
    const guardResult = Guard.againstNullOrUndefined(props.doorX, 'doorX');
    const guardResult2 = Guard.againstNullOrUndefined(props.doorY, 'doorY');

    if (!guardResult.succeeded || !guardResult2.succeeded) {
      return Result.fail<Door>(guardResult.message);
    }

    return Result.ok<Door>(new Door(props));
  }
}