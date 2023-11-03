import {Inject, Service} from "typedi";
import IRobotRepo from "../services/IRepos/IRobotRepo";
import {Document, FilterQuery, Model} from "mongoose";
import {IRobotPersistence} from "../dataschema/IRobotPersistence";
import {Robots} from "../domain/Robot/Robots";
import {IdRobots} from "../domain/Robot/IdRobots";
import {RobotMap} from "../mappers/RobotMap";
import {FloorMap} from "../mappers/FloorMap";
import {RobotType} from "../domain/RobotType/RobotType";
import {IRobotTypePersistence} from "../dataschema/IRobotTypePersistence";
import {TypeID} from "../domain/RobotType/typeId";
import {BuildingId} from "../domain/Building/buildingId";
import {BuildingMap} from "../mappers/BuildingMap";


@Service()
export default class robotRepo implements IRobotRepo {

    constructor(
        @Inject("robotSchema") private robotSchema: Model<IRobotPersistence & Document>,
        @Inject("robotTypeSchema") private robotTypeSchema: Model<IRobotTypePersistence & Document>
    ) {
    }


    public async save(robot: Robots): Promise<Robots> {
        const query = {idRobot: robot.idRobot.idRobot};

        const RobotDocument1 = await this.robotSchema.findOne(query);

        try {
            if (RobotDocument1 === null) {
                const rawRobot: any = RobotMap.toPersistence(robot);
                console.log(rawRobot);

                const RobotCreated = await this.robotSchema.create(rawRobot);
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

    public async findByType(typeOfRobot : string | TypeID ): Promise<boolean> {

        const idX = typeOfRobot instanceof TypeID ? (<TypeID>typeOfRobot).typeId : typeOfRobot

        const query = { typeOfRobot: idX };

        const typeOfRobotRecord = await this.robotTypeSchema.findOne(query);

        if (typeOfRobotRecord != null) {
            return true
        } else
            return false;
    }
    public async findByRobotId(idRobot: string | IdRobots): Promise<Robots> {
        const idX = idRobot instanceof  IdRobots ? (<IdRobots>idRobot).idRobot : idRobot;

        const query = { idRobot: idX };
        const robotIdRecord = await this.robotSchema.findOne(query);

        if (robotIdRecord != null) {
            return RobotMap.toDomain(robotIdRecord);
        }

        return null;
    }

    // @ts-ignore
    public async exists(idRobots: IdRobots | string): Promise<boolean> {
        const idX = idRobots instanceof IdRobots ? (<IdRobots>idRobots).idRobot : IdRobots;

        const query = {domainId: idX};
        const RobotDocument = await this.robotSchema.findOne(query);

        return !!RobotDocument === true;
    }


}