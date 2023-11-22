import {Inject, Service} from "typedi";
import config from "../../config";
import IRobotService from "./IServices/IRobotService";
import IRobotDTO from "../dto/IRobotDTO";
import {Result} from "../core/logic/Result";
import IRobotRepo from "./IRepos/IRobotRepo";
import {Robots} from "../domain/Robot/Robots";
import { RobotMap } from "../mappers/RobotMap";
import {IdRobots} from "../domain/Robot/IdRobots";
import IFloorDTO from "../dto/IFloorDTO";
import robotTypeRepo from "../repos/robotTypeRepo";
import {TypeId} from "../domain/RobotType/TypeId";
import {RobotType} from "../domain/RobotType/RobotType";
import {Document, FilterQuery, Model} from "mongoose";
import {IRobotTypePersistence} from "../dataschema/IRobotTypePersistence";
import {RobotTypeMap} from "../mappers/RobotTypeMap";
import robotTypeSchema from "../persistence/schemas/robotTypeSchema";
import robotTypeService from "./robotTypeService";
import RobotTypeSchema from "../persistence/schemas/robotTypeSchema";

@Service()
export default class robotService implements IRobotService {
    constructor(
        @Inject(config.repos.robot.name) private robotRepo: IRobotRepo,
        @Inject("robotTypeSchema") private robotTypeSchema: Model<IRobotTypePersistence & Document>
    ) {
    }


    public async createRobot(idRobot: string, robotDTO: IRobotDTO) : Promise<Result<IRobotDTO>>{
        try {
            const id = await this.robotRepo.findByRobotId(robotDTO.idRobot);

            if (id != null) {
                return Result.fail<IRobotDTO>(" ID already exists: " + robotDTO.idRobot);
            }


            const robotType = await this.robotRepo.findByType(robotDTO.typeId);


            if (robotType === false) {
                return Result.fail<IRobotDTO>(" ID isn't valid: " + robotDTO.idRobot);
            }

            console.log("\nRobot DTO \n");
            console.log(robotDTO);
            console.log("\nBefore creating \n");
            console.log(robotDTO.idRobot);
            // Create robot entity
            const robotOrError = await Robots.create(robotDTO);

            console.log("\nAfter creating \n");
            console.log(robotOrError);

            // Check if robot entity was created successfully
            if (robotOrError.isFailure) {
                return Result.fail<IRobotDTO>(robotOrError.errorValue());
            }

            // Save robot entity
            const RobotResult = robotOrError.getValue();

            console.log("\nRobot Result \n");
            console.log(RobotResult.idRobot.idRobot);
            await this.robotRepo.save(RobotResult);

            // Return Robot entity
            const RobotDTOResult = RobotMap.toDTO(RobotResult) as IRobotDTO;
            return Result.ok<IRobotDTO>(RobotDTOResult);
        } catch (e) {
            throw e;
        }


    }

    public async getRobots(): Promise<Result<Array<IRobotDTO>>> {
        try {
            const robots = await this.robotRepo.getRobots();
            //console.log(robots);
            const robotDTOList = robots.map(robot => RobotMap.toDTO(robot));
            return Result.ok<Array<IRobotDTO>>(robotDTOList);
        } catch (e) {
            throw e;
        }
    }

    public async inibirRobot(idRobot: string): Promise<Result<IRobotDTO>> {
        try {
            const robot = await this.robotRepo.findByRobotId( idRobot );
            if (robot === null) {
                return Result.fail<IRobotDTO>("Robot not found");
            } else {
                robot.props.active = false;
                await this.robotRepo.save(robot);
                const robotDTOResult = RobotMap.toDTO(robot);
                return Result.ok<IRobotDTO>(robotDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }
}