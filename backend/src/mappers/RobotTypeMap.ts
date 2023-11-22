
import { Model } from "mongoose";
import { Mapper } from "../core/infra/Mapper";
import { IRobotTypePersistence } from "../dataschema/IRobotTypePersistence";
import { RobotType } from "../domain/RobotType/RobotType";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Document } from "mongoose";

export class RobotTypeMap implements Mapper<RobotType> {
    public static toDTO(robot: RobotType): any {
        return {
            typeId: robot.typeId.typeId,
            brand: robot.brand.brand,
            model: robot.model.model,
            taskCategory: robot.taskCategory.category,
        } as IRobotTypeDTO;
    }


    public static toDomain(robot: any | Model<IRobotTypePersistence & Document>): RobotType {
        const robotOrError = RobotType.create(robot, new UniqueEntityID(robot.domainId));
        robotOrError.isFailure ? console.log(robotOrError.error) : '';

        return robotOrError.isSuccess ? robotOrError.getValue() : null;
    }

    public static toPersistence(robot: RobotType): any {
        return {
            typeId: robot.typeId.typeId,
            brand: robot.brand.brand,
            model: robot.model.model,
            taskCategory: robot.taskCategory.category,
        }
    }
}
