import { List } from "lodash";
import { Task } from "../domain/RobotType/task";

export interface  IRobotTypePersistence{
    typeId: string;
    brand: string;
    model: string;
    tasks: List<String>;
  }