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
import List = Mocha.reporters.List;
import { Connection } from "../Connection/connection";
import { Elevator } from "../Elevator/elevator";
import { Room } from "../Room/room";

interface BuildingProps {
  buildingId: BuildingId;
  buildingName: BuildingName;
  buildingDescription?: BuildingDescription;
  buildingNumberOfFloors: BuildingNumberOfFloors;
  dimX: number;
  dimY: number;
  wallHeight: number;
  wallWidth: number;
  floors: Floor[];
}

export class Building extends AggregateRoot<BuildingProps> {

  get id (): UniqueEntityID {
    return this._id;
  }
  get buildingId (): BuildingId {
    return this.props.buildingId;
  }

  get wallHeight (): number {
    return this.props.wallHeight;
  }

  get wallWidth (): number {
    return this.props.wallWidth;
  }

  get buildingName (): BuildingName {
    return this.props.buildingName;
  }

  get floors (): Floor[] {
    return this.props.floors;
  }

  get connections (): Connection[] {
    return this.props.floors.flatMap(floor => floor.connections);
  }


  get buildingDescription (): BuildingDescription {
    return this.props.buildingDescription;
  }

  get dimX (): number {
    return this.props.dimX;
  }

  get dimY (): number {
    return this.props.dimY;
  }

  get buildingNumberOfFloors (): BuildingNumberOfFloors {
    return this.props.buildingNumberOfFloors;
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

  set dimX (value: number) {
    this.props.dimX = value;
  }

  set dimY (value: number) {
    this.props.dimY = value;
  }

  set floors (value: Floor[]) {
    this.props.floors = value;
  }

  set wallHeight (value: number) {
    this.props.wallHeight = value;
  }

  set wallWidth (value: number) {
    this.props.wallWidth = value;
  }


  // Add floor to building
  public addFloor(floor: Floor): void {
    this.props.floors = [...this.props.floors, floor];
  }

  // Add connection to a floor that is already in the building
  public addConnectionToFloor(floorId: string, connection: Connection): void {
    if (this.props.floors.find(floor => floor.floorId === floorId)) {
      this.props.floors.find(floor => floor.floorId === floorId).addConnection(connection);
    } else
      throw new Error("Floor not found");
  }

  public addRoomToFloor(floorId: string, room: Room): void {
    if (this.props.floors.find(floor => floor.floorId === floorId)) {
      this.props.floors.find(floor => floor.floorId === floorId).addRoom(room);
    } else
      throw new Error("Floor not found");
  }



  // Remove floor from building
  public removeFloor(floor: Floor): void {
    this.props.floors = this.props.floors.filter(existingFloor => existingFloor !== floor);
  }


  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);

  }

  public static create (buildingDTO: IBuildingDTO, id?: UniqueEntityID): Result<Building> {

    if (buildingDTO.dimX <= 0 || buildingDTO.dimY <= 0) {
      return Result.fail<Building>("Dimension cannot be negative or zero");
    }

    const buildingId = buildingDTO.buildingId;
    const buildingName = buildingDTO.buildingName;
    const buildingDescription = buildingDTO.buildingDescription;
    const buildingNumberOfFloors = buildingDTO.buildingNumberOfFloors;
    const dimensionX = buildingDTO.dimX;
    const dimensionY = buildingDTO.dimY;

    const building = new Building(
      {
        buildingId: BuildingId.create({buildingId}).getValue(),
        buildingName: BuildingName.create({ buildingName }).getValue(),
        buildingDescription: BuildingDescription.create({ buildingDescription }).getValue(),
        buildingNumberOfFloors: BuildingNumberOfFloors.create({buildingNumberOfFloors}).getValue(),
        dimX: dimensionX,
        dimY: dimensionY,
        wallHeight: buildingDTO.wallHeight,
        wallWidth: buildingDTO.wallWidth,
        floors: buildingDTO.floors.map(floor => Floor.create(floor).getValue()),
      },
      id
    );
    return Result.ok<Building>(building);
  }
}






