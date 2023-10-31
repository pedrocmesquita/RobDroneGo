
import { Model } from "mongoose";
import { Mapper } from "../core/infra/Mapper";
import { IRobotPersistence } from "../dataschema/IRobotTypePersistence";
import { Robot } from "../domain/RobotType/robotType";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Document } from "mongoose";

export class RobotTypeMap implements Mapper<Robot> {
    public static toDTO(robot: Robot): any {
        return {
            typeId: robot.typeId.typeId,
            brand: robot.brand.brand,
            model: robot.model.model,
            tasks: robot.tasks,
        } as IRobotTypeDTO;
    }


    public static toDomain(robot: any | Model<IRobotPersistence & Document>): Robot {
        const robotOrError = Robot.create(robot, new UniqueEntityID(robot.domainId));
        robotOrError.isFailure ? console.log(robotOrError.error) : '';

        return robotOrError.isSuccess ? robotOrError.getValue() : null;
    }

    public static toPersistence(robot: Robot): any {
        return {
            typeId: robot.typeId.typeId,
            brand: robot.brand.brand,
            model: robot.model.model,
            task: robot.tasks,

        }
    }
}
