import { List } from "lodash";
import { Task } from "../domain/RobotType/task";

export interface  IRobotPersistence{
    typeId: string;
    brand: string;
    model: string;
    tasks: List<String>;
  }