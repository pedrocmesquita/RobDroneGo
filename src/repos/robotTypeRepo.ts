import { Service, Inject } from "typedi";
import { Document, FilterQuery, Model } from "mongoose";
import IRobotRepo from "../services/IRepos/IRobotTypeRepo";
import  { IRobotPersistence }  from  "../dataschema/IRobotTypePersistence";
import { Robot } from "../domain/RobotType/robotType";
import { RobotTypeMap } from "../mappers/RobotTypeMap";
import { TypeID } from "../domain/RobotType/typeId";


@Service()
export default class robotTypeRepo implements IRobotRepo {

    constructor(
        @Inject("robotTypeSchema") private robotTypeSchema: Model<IRobotPersistence & Document>
    ) {}


    public async save(robot: Robot): Promise<Robot> {
        const query = { typeId: robot.typeId.typeId };

        const RobotDocument = await this.robotTypeSchema.findOne(query);

        try {
            if (RobotDocument === null) {
                const rawRobot: any = RobotTypeMap.toPersistence(robot);
                console.log(rawRobot);

                const RobotCreated = await this.robotTypeSchema.create(rawRobot);

                return RobotTypeMap.toDomain(RobotCreated);
            } else {
                RobotDocument.typeId = robot.typeId.typeId;
                RobotDocument.brand = robot.brand.brand;
                RobotDocument.model = robot.model.model;
            
                await RobotDocument.save();

                return robot;
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
    public async getRobotsTypes(): Promise<Robot[]> {
        try {
            const robot = await this.robotTypeSchema.find();
      
            const RobotDTOResult = robot.map(robot => RobotTypeMap.toDomain(robot));
      
            return RobotDTOResult;
          } catch (e) {
            throw e;
          }
    }
    public async update(robot: Robot): Promise<Robot> {
        await this.robotTypeSchema.updateOne( { typeId: robot.typeId.typeId }, RobotTypeMap.toDTO(robot));

        const updatedRobot = await this.robotTypeSchema.findOne({ typeId: robot.typeId.typeId });

        return RobotTypeMap.toDomain(updatedRobot);
    }
    

    public async delete(typeid: string | TypeID): Promise<void> {
        const query = { typeid: typeid   };
        await this.robotTypeSchema.deleteOne(query as FilterQuery<IRobotPersistence & Document>);
    }


    public async findByrobotTypeID(typeId: string | TypeID): Promise<Robot> {
        const query = { typeId: typeId };
        const RobotRecord = await this.robotTypeSchema.findOne(
            query as FilterQuery<IRobotPersistence & Document>
        );

        if (RobotRecord != null) {
            return RobotTypeMap.toDomain(RobotRecord);
        }
        return null;
    }

    // @ts-ignore
    public async exists(typedi: TypeID | string): Promise<boolean> {
        const idX = typedi instanceof TypeID ? (<TypeID>typedi).typeId : typedi;

        const query = { domainId: idX };
        const RobotDocument = await this.robotTypeSchema.findOne(query);

        return !!RobotDocument === true;
    }
    
}  