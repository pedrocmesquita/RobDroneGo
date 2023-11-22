import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RoomNameProps {
  roomName: string;
}

export class RoomName extends ValueObject<RoomNameProps> {
  get roomName(): string {
    return this.props.roomName;
  }

  private constructor(props: RoomNameProps) {
    super(props);
  }

  public static create(props: RoomNameProps): Result<RoomName> {
    const guardResult = Guard.againstNullOrUndefined(props.roomName, "name");

    if (!guardResult.succeeded) {
      return Result.fail<RoomName>(guardResult.message);
    }

    // Check if the name has a maximum of 50 alphanumeric characters and a space.
    if (!/^[a-zA-Z0-9 ]{1,50}$/.test(props.roomName)) {
      return Result.fail<RoomName>("RoomName must have a maximum of 50 characters.");
    }

    return Result.ok<RoomName>(new RoomName(props));
  }
}