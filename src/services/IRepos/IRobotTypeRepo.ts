import { RobotType} from "../../domain/RobotType/RobotType";
import { TypeID } from "../../domain/RobotType/typeId";
import { Repo } from "../../core/infra/Repo";


export default interface IRobotTypeRepo extends Repo<RobotType> {
	save(robot: RobotType): Promise<RobotType>;
    getRobotsTypes(): Promise<RobotType[]>;
    update(robot: RobotType): Promise<RobotType>;
    delete(typeid: TypeID | string): void;
    findByrobotTypeID(typeId: string): Promise<RobotType>;

}