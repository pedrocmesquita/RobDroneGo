import IRobotDTO from "../../dto/IRobotDTO";
import {Result} from "../../core/logic/Result";

export default interface IRobotService  {
    createRobot(idRobot: string, IRobotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
    getRobot(idRobot: string): Promise<Result<IRobotDTO>>;
    inibirRobot( idRobot: string): Promise<Result<IRobotDTO>>;
}