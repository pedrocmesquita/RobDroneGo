import {Inject, Service} from "typedi";
import IRobotRepo from "../services/IRepos/IRobotRepo";
import {FilterQuery, Model} from "mongoose";
import {IRobotPersistence} from "../dataschema/IRobotPersistence";
import {Robots} from "../domain/Robot/Robots";
import {IdRobots} from "../domain/Robot/IdRobots";
import {RobotMap} from "../mappers/RobotMap";
import {FloorMap} from "../mappers/FloorMap";


@Service()
export default class robotRepo implements IRobotRepo {

    constructor(
        @Inject("robotSchema") private robotSchema: Model<IRobotPersistence & Document>
    ) {}


    public async save(robot: Robots): Promise<Robots> {
        const query = { idRobot: robot.idRobot.idRobot };

        const RobotDocument1 = await this.robotSchema.findOne(query);

        try {
            if (RobotDocument1 === null) {
                const rawRobot: any = RobotMap.toPersistence(robot);
                console.log(rawRobot);

                const RobotCreated = await this.robotSchema.create(rawRobot);
                //escreve abc na consola
                console.log("errro 1");
                return RobotMap.toDomain(RobotCreated);
            } else {
                RobotDocument1.idRobot = robot.idRobot.idRobot;
                RobotDocument1.robotName = robot.name.robotName;
                RobotDocument1.typeOfRobot = robot.typeOfRobot.typeOfRobots;
                RobotDocument1.serialNumber = robot.serialNumber.serialNumber;
                RobotDocument1.description = robot.description.description;
                RobotDocument1.active = robot.active;
                await RobotDocument1.save();

                return robot;
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
    public async getRobots(): Promise<Robots[]> {
        try {
            const robot = await this.robotSchema.find();

            const RobotDTOResult = robot.map(robot => RobotMap.toDomain(robot));

            return RobotDTOResult;
          } catch (e) {
            throw e;
          }
    }


    public async findByRobotId(idRobot: string | IdRobots): Promise<Robots> {
        const idX = idRobot;

        const query = { robotId: idX };
        const robotRecord = await this.robotSchema.findOne(query);

        if (robotRecord != null) {
            const robot = RobotMap.toDomain(robotRecord);
            return robot;
        }
        else {
            return null;
        }
    }

    // @ts-ignore
    public async exists(  idRobots: IdRobots | string): Promise<boolean> {
        const idX = idRobots instanceof IdRobots ? (<IdRobots>idRobots).idRobot : IdRobots;

        const query = { domainId: idX };
        const RobotDocument = await this.robotSchema.findOne(query);

        return !!RobotDocument === true;
    }

}