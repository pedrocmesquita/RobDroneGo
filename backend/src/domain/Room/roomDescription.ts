import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface RoomDescriptionProps {
  roomDescription: string;
}

export class RoomDescription extends ValueObject<RoomDescriptionProps> {
  get roomDescription (): string {
    return this.props.roomDescription;
  }

  private constructor (props: RoomDescriptionProps) {
    super(props);
  }

  public static create (props: RoomDescriptionProps): Result<RoomDescription> {
    const guardResult = Guard.againstNullOrUndefined(props.roomDescription, 'description');

    if (!guardResult.succeeded) {
      return Result.fail<RoomDescription>(guardResult.message);
    }

    // Check if the description has less than 255 alphanumeric characters
    if (!/^[a-zA-Z0-9 ]{1,255}$/.test(props.roomDescription)) {
      return Result.fail<RoomDescription>("The description has more than 255 alphanumeric characters.");
    }

    return Result.ok<RoomDescription>(new RoomDescription(props));
  }
}