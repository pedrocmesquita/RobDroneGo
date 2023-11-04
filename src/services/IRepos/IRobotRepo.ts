import { Repo } from "../../core/infra/Repo";
import { Robots } from "../../domain/Robot/Robots";
import {IdRobots} from "../../domain/Robot/IdRobots";
import {TypeId} from "../../domain/RobotType/TypeId";


export default interface IRobotRepo extends Repo<Robots> {
    save(robot: Robots): Promise<Robots>;
    getRobots(): Promise<Array<Robots>>;
    findByRobotId(  idRobot : string    ): Promise<Robots>;
    findByRobotName(robotName: string): Promise<Robots>;
    findByType(typeId : string | TypeId): Promise<boolean>;
}