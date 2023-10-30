import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IRobotTypeService from './IServices/IRobotTypeService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import IRoleDTO from '../dto/IRoleDTO';
import IRobotTypeRepo from './IRepos/IRobotTypeRepo';
import { RobotTypeMap } from '../mappers/RobotTypeMap';
import { Robot } from '../domain/RobotType/robotType';


@Service()
export default class robotTypeService implements IRobotTypeService {
    constructor(
        @Inject(config.repos.robot.name) private robotTypeRepo : IRobotTypeRepo
    ) {}

    public async createRobotType(typedi: string, robotTypeDTO: IRobotTypeDTO ): Promise<Result<IRobotTypeDTO>> {
        try {
            const id = await this.robotTypeRepo.findByrobotTypeID(robotTypeDTO.typeId);

            // Check if robot already exists
            if (typedi != null) {
                return Result.fail<IRobotTypeDTO>('Robot already exists: ' + robotTypeDTO.typeId);
            }

            console.log("\nRobot DTO \n");
            console.log(robotTypeDTO);
            console.log("\nBefore creating \n");
            console.log(typedi);
            // Create building entity
            const robotOrError = await Robot.create(robotTypeDTO);

            console.log("\nAfter creating \n");
            console.log(robotOrError);

            // Check if robot entity was created successfully
            if (robotOrError.isFailure) {
                return Result.fail<IRobotTypeDTO>(robotOrError.errorValue());
            }

            // Save robot entity
            const RobotResult = robotOrError.getValue();

            console.log("\nRobot Result \n");
            console.log(RobotResult.typeId.typeId);
            await this.robotTypeRepo.save(RobotResult);

            // Return Robot entity
            const RobotDTOResult = RobotTypeMap.toDTO(RobotResult) as IRobotTypeDTO;
            return Result.ok<IRobotTypeDTO>(RobotDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async updateRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
        try {
            const exists = await this.robotTypeRepo.findByrobotTypeID(robotTypeDTO.typeId);

            if (exists === null) {
                return Result.fail<IRobotTypeDTO>("Robot not found");
            }

            const updatedRobot = await this.robotTypeRepo.update(RobotTypeMap.toDomain(robotTypeDTO));
            const buildingDTOResult = RobotTypeMap.toDTO(updatedRobot) as IRobotTypeDTO;
            return Result.ok<IRobotTypeDTO>(buildingDTOResult);
        } catch (e) {
            throw e;
        }
    }
  
    public async getRobotType(typedi: string): Promise<Result<IRobotTypeDTO>> {
        try {
            const robot = await this.robotTypeRepo.findByrobotTypeID(typedi);
            if (robot === null) {
                return Result.fail<IRobotTypeDTO>("Robot not found");
            }else {
                const robotDTOResult = RobotTypeMap.toDTO( robot ) as IRobotTypeDTO;
                return Result.ok<IRobotTypeDTO>( robotDTOResult )
            }
        } catch (e) {
            throw e;
        }
    }

    public async getRobotsTypes(): Promise<Result<IRobotTypeDTO[]>> {
        try {
            const robots = await this.robotTypeRepo.getRobotsTypes();
            const robotDTOArray = robots.map((robot) => RobotTypeMap.toDTO(robot) as IRobotTypeDTO);
            return Result.ok<IRobotTypeDTO[]>(robotDTOArray);
        } catch (e) {
            throw e;
        }
    }

    public async deleteRobotType(typedi: string): Promise<Result<boolean>> {
        try {
            const robot = await this.robotTypeRepo.findByrobotTypeID(typedi);
            if (robot === null) {
                return Result.fail<boolean>("Robot not found");
            }else {
                await this.robotTypeRepo.delete(typedi);
                return Result.ok<boolean>(true)
            }
        } catch (e) {
            throw e;
        }
    }


}