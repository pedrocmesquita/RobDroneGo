import { set } from "lodash";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";


// BuildingID is a value object, so we can use it as a property of Building.
// BuildingID must be unique.

interface BuildingProps {
  buildingId: string;
}



export class Building extends AggregateRoot<BuildingProps> {
  get buildingId (): string {
    return this.props.buildingId;
  }

  set buildingId (value: string) {
    this.props.buildingId = value;
  }

  private constructor (props: BuildingProps) {
    super(props);
  }

  public static create (props: BuildingProps): Result<Building> {
    const building = new Building(props);

    return Result.ok<Building>(building);
  }
}






