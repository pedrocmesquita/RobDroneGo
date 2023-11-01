import {Inject, Service} from "typedi";
import IRobotRepo from "../services/IRepos/IRobotRepo";
import {FilterQuery, Model} from "mongoose";
import {IRobotPersistence} from "../dataschema/IRobotPersistence";
import {Robots} from "../domain/Robot/robots";
import {IdRobots} from "../domain/Robot/IdRobots";
import {RobotTypeMap} from "../mappers/RobotMap";


@Service()
export default class robotRepo implements IRobotRepo {

    constructor(
        @Inject("robotSchema") private robotSchema: Model<IRobotPersistence & Document>
    ) {}


    public async save(robot: Robots): Promise<Robots> {
        const query = { idRobot: robot.idRobot.idRobot };

        const RobotDocument = await this.robotSchema.findOne(query);

        try {
            if (RobotDocument === null) {
                const rawRobot: any = RobotTypeMap.toPersistence(robot);
                console.log(rawRobot);

                const RobotCreated = await this.robotSchema.create(rawRobot);

                return RobotTypeMap.toDomain(RobotCreated);
            } else {
                RobotDocument.idRobot = robot.idRobot.idRobot;
                RobotDocument.robotName = robot.name.robotName;
                RobotDocument.typeOfRobot = robot.typeOfRobot.typeOfRobots;
                RobotDocument.serialNumber = robot.serialNumber.serialNumber;
                RobotDocument.description = robot.description.description;
                RobotDocument.active = robot.active;
                await RobotDocument.save();

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

            const RobotDTOResult = robot.map(robot => RobotTypeMap.toDomain(robot));

            return RobotDTOResult;
          } catch (e) {
            throw e;
          }
    }


    public async findByrobotTypeID(idRobot: string | IdRobots): Promise<Robots> {
            const query = { idRobot: idRobot };
        const RobotRecord = await this.robotSchema.findOne(
            query as FilterQuery<IRobotPersistence & Document>
        );

        if (RobotRecord != null) {
            return RobotTypeMap.toDomain(RobotRecord);
        }
        return null;
    }

    // @ts-ignore
    public async exists(  idRobots: IdRobots | string): Promise<boolean> {
        const idX = idRobots instanceof IdRobots ? (<IdRobots>idRobots).idRobot : IdRobots;

        const query = { domainId: idX };
        const RobotDocument = await this.robotSchema.findOne(query);

        return !!RobotDocument === true;
    }

}