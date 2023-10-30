import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/RobotType/robotType";
import { TypeID } from "../../domain/RobotType/typeId";


export default interface IRobotRepo extends Repo<Robot> {
	save(robot: Robot): Promise<Robot>;
	getRobotsTypes(): Promise<Robot[]>;
  update(robot: Robot): Promise<Robot>;
  delete(typeid: TypeID | string): void;
  findByrobotTypeID(typedi: TypeID | string): Promise<Robot>;

}