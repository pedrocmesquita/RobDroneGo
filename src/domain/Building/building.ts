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






