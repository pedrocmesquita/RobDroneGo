import { Service, Inject } from "typedi";
import {Document, FilterQuery, Model} from "mongoose";
import IRobotTypeRepo from "../services/IRepos/IRobotTypeRepo";
import  { IRobotTypePersistence }  from  "../dataschema/IRobotTypePersistence";
import { RobotType } from "../domain/RobotType/RobotType";
import { RobotTypeMap } from "../mappers/RobotTypeMap";
import { TypeId } from "../domain/RobotType/TypeId";
import {Floor} from "../domain/Floor/floor";
import {FloorMap} from "../mappers/FloorMap";
import {RobotMap} from "../mappers/RobotMap";


@Service()
export default class robotTypeRepo implements IRobotTypeRepo {

    constructor(
        @Inject("robotTypeSchema") private robotTypeSchema: Model<IRobotTypePersistence & Document>
    ) {}


    public async save(robot: RobotType): Promise<RobotType> {
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
                RobotDocument.taskCategory = robot.taskCategory.category;
            
                await RobotDocument.save();

                return robot;
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
    public async getRobotsTypes(): Promise<RobotType[]> {
        try {
            const robot = await this.robotTypeSchema.find();
      
            const RobotDTOResult = robot.map(robot => RobotTypeMap.toDomain(robot));
      
            return RobotDTOResult;
          } catch (e) {
            throw e;
          }
    }
    public async update(robot: RobotType): Promise<RobotType> {
        await this.robotTypeSchema.updateOne( { typeId: robot.typeId.typeId }, RobotTypeMap.toDTO(robot));

        const updatedRobot = await this.robotTypeSchema.findOne({ typeId: robot.typeId.typeId });

        return RobotTypeMap.toDomain(updatedRobot);
    }
    

    public async delete(typeid: string | TypeId): Promise<void> {
        const query = { typeid: typeid   };
        await this.robotTypeSchema.deleteOne(query as FilterQuery<IRobotTypePersistence & Document>);
    }


    public async findByrobotTypeID(typeId: string | TypeId): Promise<RobotType> {
        const query = { typeId: typeId };
        const RobotRecord = await this.robotTypeSchema.findOne(
            query as FilterQuery<IRobotTypePersistence & Document>
        );

        if (RobotRecord != null) {
            return RobotTypeMap.toDomain(RobotRecord);
        }
        return null;
    }

    // @ts-ignore
    public async exists(typedi: TypeId | string): Promise<boolean> {
        const idX = typedi instanceof TypeId ? (<TypeId>typedi).typeId : typedi;

        const query = { domainId: idX };
        const RobotDocument = await this.robotTypeSchema.findOne(query);

        return !!RobotDocument === true;
    }


    }