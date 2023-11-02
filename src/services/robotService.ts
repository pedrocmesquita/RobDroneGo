import {Inject, Service} from "typedi";
import config from "../../config";
import IRobotService from "./IServices/IRobotService";
import IRobotDTO from "../dto/IRobotDTO";
import {Result} from "../core/logic/Result";
import IRobotRepo from "./IRepos/IRobotRepo";
import {Robots} from "../domain/Robot/Robots";
import { RobotMap } from "../mappers/RobotMap";
import {IdRobots} from "../domain/Robot/IdRobots";


@Service()
export default class robotService implements IRobotService {
    constructor(
        @Inject(config.repos.robot.name) private robotRepo: IRobotRepo
    ) {
    }

    public async createRobot(idRobot: string, robotDTO: IRobotDTO) : Promise<Result<IRobotDTO>>{
        try {
            const id = await this.robotRepo.findByRobotId(idRobot);

            // Check if robot already exists
            if (id != null) {
                return Result.fail<IRobotDTO>('Robot already exists: ' + robotDTO.idRobot);
            }
            console.log("\nRobot DTO \n");
            console.log(robotDTO);
            console.log("\nBefore creating \n");
            console.log(idRobot);
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

    public async getRobot(idRobot: string): Promise<Result<IRobotDTO>> {
        try {
            const robot = await this.robotRepo.findByRobotId(idRobot);
            if (robot === null) {
                return Result.fail<IRobotDTO>("Robot not found");
            } else {
                const robotDTOResult = RobotMap.toDTO(robot) as IRobotDTO;
                return Result.ok<IRobotDTO>(robotDTOResult);
            }
            }catch (e) {
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