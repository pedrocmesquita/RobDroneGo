import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Task } from "./task";
import { Result } from "../../core/logic/Result";
import IRobotTypeDTO from "../../dto/IRobotTypeDTO";
import { TypeID } from "./typeId";
import { Brand } from "./Brand";
import { Model } from "./Model";
import { List } from "lodash";
import _ from "lodash";




interface robotProps {
    typeId: TypeID;
    brand: Brand;
    model: Model;
    tasks: List<String>;
}

export class RobotType extends AggregateRoot<robotProps> {

  get id (): UniqueEntityID {
          return this._id;
        }
        get typeId (): TypeID {
          return this.props.typeId;
        }
      
        get brand (): Brand {
          return this.props.brand;
        }
      
        get model (): Model {
          return this.props.model;
        }

        get tasks (): List<String> {
          return this.props.tasks;
        }
      
        set typeId (value: TypeID) {
          this.props.typeId = value;
        }
      
        set brand (value: Brand) {
          this.props.brand = value;
        }
      
        set model (value: Model) {
          this.props.model = value;
        }
      
      private constructor(props: robotProps, id?: UniqueEntityID) {
          super(props, id);
      }
      
      
      public static create (robotDTO: IRobotTypeDTO, id?: UniqueEntityID): Result<RobotType> {
          

          const typeId = robotDTO.typeId;
          const brand = robotDTO.brand;
          const model = robotDTO.model;
          const tasks = robotDTO.tasks;

          const robot = new RobotType (
            {
              typeId: TypeID.create({typeId}).getValue(),
              brand: Brand.create({ brand }).getValue(),
              model: Model.create({ model }).getValue(),
              tasks : _.map(tasks, task => task.toString()),               },
                id
          );
          return Result.ok<RobotType>(robot);
        }
      }
      
      
      
      
      
      
      