import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Level } from "./level";

// When we create a room, we need to specify a name and a levelId.

interface RoomProps {
  name: string;
  level: Level;
}

export class Room extends ValueObject<RoomProps> {
  get name(): string {
    return this.props.name;
  }

  get level(): Level {
    return this.props.level;
  }

  private constructor(props: RoomProps) {
    super(props);
  }

  public static create(roomProps: RoomProps): Result<Room> {

    if (!roomProps.name) {
      return Result.fail<Room>("Room name is required.");
    }

    if (!roomProps.level) {
      return Result.fail<Room>("Level is required.");
    }

    return Result.ok<Room>(new Room(roomProps));
  }
}