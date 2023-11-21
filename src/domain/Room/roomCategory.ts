import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

export enum RoomCategoryType {
  Gabinete = "Gabinete",
  Anfiteatro = "Anfiteatro",
  Laboratório = "Laboratorio",
  Outro = "Outro",
}

interface RoomCategoryProps {
  category: RoomCategoryType;
}

export class RoomCategory extends ValueObject<RoomCategoryProps> {
  get category(): RoomCategoryType {
    return this.props.category;
  }

  private constructor(props: RoomCategoryProps) {
    super(props);
  }

  public static create(props: RoomCategoryProps): Result<RoomCategory> {
    const guardResult = Guard.againstNullOrUndefined(props.category, "category");

    if (!guardResult.succeeded) {
      return Result.fail<RoomCategory>(guardResult.message);
    }

    // Additional checks for the specific category criteria if needed.
    if (!Object.values(RoomCategoryType).includes(props.category)) {
      return Result.fail<RoomCategory>("Invalid room category.");
    }

    return Result.ok<RoomCategory>(new RoomCategory(props));
  }
}
