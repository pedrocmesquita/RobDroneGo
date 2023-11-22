import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard, IGuardResult } from "../../core/logic/Guard";

interface ConnectionIdProps {
  connectionId: string;
}

export class ConnectionId extends ValueObject<ConnectionIdProps> {
  get connectionId(): string {
    return this.props.connectionId;
  }

  private constructor(props: ConnectionIdProps) {
    super(props);
  }

  public static create(props: ConnectionIdProps): Result<ConnectionId> {

    // Check if the attributes are not null or undefined
    const guardResult: IGuardResult = Guard.againstNullOrUndefined(props.connectionId, 'connectionId');

    if (!guardResult.succeeded) {
      return Result.fail<ConnectionId>(guardResult.message);
    }

    // Check if the connectionId has a maximum of 5 alphanumeric characters and a space.
    if (!/^[0-9]{1,5}$/.test(String(props.connectionId))) {
      return Result.fail<ConnectionId>('ConnectionId must be a string.');
    }

    return Result.ok<ConnectionId>(new ConnectionId(props));
  }
}
