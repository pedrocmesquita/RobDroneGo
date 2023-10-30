import { List } from "immutable";
import { Task } from "../domain/RobotType/task";

export interface  IRobotPersistence{
    typeId: string;
    brand: string;
    model: string;
    tasks: List<Task>;
  }