import { set } from "lodash";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Floor } from "../Floor/floor";
import { BuildingId} from "./buildingId";
import { BuildingName } from "./buildingName";
import { BuildingDescription } from "./buildingDescription";
import { BuildingNumberOfFloors } from "./buildingNumberOfFloors";
import IBuildingDTO from "../../dto/IBuildingDTO";

interface BuildingProps {
  buildingId: BuildingId;
  buildingName: BuildingName;
  buildingDescription?: BuildingDescription;
  buildingNumberOfFloors: BuildingNumberOfFloors;
  floors?: Floor[];
}


export class Building extends AggregateRoot<BuildingProps> {

  get id (): UniqueEntityID {
    return this._id;
  }
  get buildingId (): BuildingId {
    return this.props.buildingId;
  }

  get buildingName (): BuildingName {
    return this.props.buildingName;
  }

  get buildingDescription (): BuildingDescription {
    return this.props.buildingDescription;
  }

  get buildingNumberOfFloors (): BuildingNumberOfFloors {
    return this.props.buildingNumberOfFloors;
  }

  get floors (): Floor[] {
    return this.props.floors;
  }

  set buildingId (value: BuildingId) {
    this.props.buildingId = value;
  }

  set buildingName (value: BuildingName) {
    this.props.buildingName = value;
  }

  set buildingDescription (value: BuildingDescription) {
    this.props.buildingDescription = value;
  }

  set buildingNumberOfFloors (value: BuildingNumberOfFloors) {
    this.props.buildingNumberOfFloors = value;
  }

  set floors (value: Floor[]) {
    this.props.floors = value;
  }

  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }


  public static create (buildingDTO: IBuildingDTO, id?: UniqueEntityID): Result<Building> {
    const buildingId = buildingDTO.buildingId;
    const buildingName = buildingDTO.buildingName;
    const buildingDescription = buildingDTO.buildingDescription;
    const buildingNumberOfFloors = buildingDTO.buildingNumberOfFloors;

    const building = new Building(
      {
        buildingId: BuildingId.create({buildingId}).getValue(),
        buildingName: BuildingName.create({ buildingName }).getValue(),
        buildingDescription: BuildingDescription.create({ buildingDescription }).getValue(),
        buildingNumberOfFloors: BuildingNumberOfFloors.create({buildingNumberOfFloors}).getValue()
      },
      id
    );
    return Result.ok<Building>(building);
  }
}






