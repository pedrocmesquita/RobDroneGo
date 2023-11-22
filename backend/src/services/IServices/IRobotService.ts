import IRobotDTO from "../../dto/IRobotDTO";
import {Result} from "../../core/logic/Result";

export default interface IRobotService  {
    createRobot(idRobot: string, IRobotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
    getRobots(): Promise<Result<Array<IRobotDTO>>>;
    inibirRobot( idRobot: string): Promise<Result<IRobotDTO>>;
}