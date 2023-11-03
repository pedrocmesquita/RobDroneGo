import { Repo } from "../../core/infra/Repo";
import { Robots } from "../../domain/Robot/Robots";
import {IdRobots} from "../../domain/Robot/IdRobots";
import {TypeID} from "../../domain/RobotType/typeId";


export default interface IRobotRepo extends Repo<Robots> {
    save(robot: Robots): Promise<Robots>;
    getRobots(): Promise<Robots[]>;
    findByRobotId(  idRobot : string    ): Promise<Robots>;
    findByRobotName(robotName: string): Promise<Robots>;
    findByType(typeOfRobot : string | TypeID): Promise<boolean>;
}