import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { BuildingId } from "./buildingId";
import { Room } from "./room";
import { Level } from "./level";


// Building has levels, and each level has rooms, and each room has a name.
// When we first create a building it has nothing in it, we can add it later.

interface BuildingProps {
  buildingId: BuildingId;
  levels: Level[];
  rooms: Room[];
}

export class Building extends AggregateRoot<BuildingProps> {
  get buildingId(): BuildingId {
    return this.props.buildingId;
  }

  get levels(): Level[] {
    return this.props.levels;
  }

  get rooms(): Room[] {
    return this.props.rooms;
  }

  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: BuildingProps, id?: UniqueEntityID): Result<Building> {
    
    if (!props.buildingId) {
      return Result.fail<Building>("Building ID is required.");
    }

    return Result.ok<Building>(new Building(props, id));

  }
}








