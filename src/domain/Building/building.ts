import { set } from "lodash";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Floor } from "./floor";


// BuildingID is a value object, so we can use it as a property of Building.
// BuildingID must be unique.

interface BuildingProps {
  buildingId: string; // Should be a UUID and created by the database.
  buildingName: string;
  buildingNumberOfFloors: number;
  floors: Floor[];
}



export class Building extends AggregateRoot<BuildingProps> {
  get buildingId (): string {
    return this.props.buildingId;
  }

  get buildingName (): string {
    return this.props.buildingName;
  }

  get buildingNumberOfFloors (): number {
    return this.props.buildingNumberOfFloors;
  }

  get floors (): Floor[] {
    return this.props.floors;
  }

  set buildingId (value: string) {
    this.props.buildingId = value;
  }

  set buildingName (value: string) {
    this.props.buildingName = value;
  }

  set buildingNumberOfFloors (value: number) {
    this.props.buildingNumberOfFloors = value;
  }

  set floors (value: Floor[]) {
    this.props.floors = value;
  }

  private constructor (props: BuildingProps) {
    super(props);
  }

  public static create (props: BuildingProps): Result<Building> {
    const building = new Building(props);

    return Result.ok<Building>(building);
  }
}






