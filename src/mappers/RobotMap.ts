import {Mapper} from "../core/infra/Mapper";
import { Robots } from "../domain/Robot/robots";
import IRobotDTO from "../dto/IRobotDTO";
import {Model} from "mongoose";
import { IRobotPersistence } from "../dataschema/IRobotPersistence";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

export class RobotTypeMap implements Mapper<Robots> {
    public static toDTO(robot: Robots): any {
        return {
            idRobot: robot.idRobot.idRobot,
            robotName: robot.name.robotName,
            typeOfRobot: robot.typeOfRobot.typeOfRobots,
            serialNumber: robot.serialNumber.serialNumber,
            description: robot.description.description,
            active: robot.active
        } as IRobotDTO;
    }


    public static toDomain(robot: any | Model<IRobotPersistence & Document>): Robots {
        const robotOrError = Robots.create(robot, new UniqueEntityID(robot.domainId));
        robotOrError.isFailure ? console.log(robotOrError.error) : '';

        return robotOrError.isSuccess ? robotOrError.getValue() : null;
    }

    public static toPersistence(robot: Robots): any {
        return {
            idRobot: robot.idRobot.idRobot,
            robotName: robot.name.robotName,
            typeOfRobot: robot.typeOfRobot.typeOfRobots,
            serialNumber: robot.serialNumber.serialNumber,
            description: robot.description.description,
            active: robot.active
        }
    }
}