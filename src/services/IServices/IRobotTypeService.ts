import { Result } from "../../core/logic/Result";
import IRobotTypeDTO from "../../dto/IRobotTypeDTO";
import IRobotDTO from "../../dto/IRoleDTO";

export default interface IRobotTypeService  {
    createRobotType(typedi: string, robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
    updateRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
    getRobotType(typedi: string): Promise<Result<IRobotTypeDTO>>;
    getRobotsTypes( ): Promise<Result<IRobotTypeDTO[]>>;
    deleteRobotType( typedi: string): Promise<Result<boolean>>;

}
