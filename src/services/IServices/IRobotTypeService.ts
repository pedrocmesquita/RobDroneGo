import { Result } from "../../core/logic/Result";
import IRobotTypeDTO from "../../dto/IRobotTypeDTO";
import IRobotDTO from "../../dto/IRoleDTO";

export default interface IRobotTypeService  {
    createRobotType(typeId: string, robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
    updateRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
    getRobotType(typeId: string): Promise<Result<IRobotTypeDTO>>;
    getRobotsTypes( ): Promise<Result<IRobotTypeDTO[]>>;
    deleteRobotType( typeId: string): Promise<Result<boolean>>;

}
