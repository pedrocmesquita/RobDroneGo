import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { TaskCategory, TaskCategoryType } from "./TaskCategory";
import { Result } from "../../core/logic/Result";
import IRobotTypeDTO from "../../dto/IRobotTypeDTO";
import { TypeId } from "./TypeId";
import { Brand } from "./Brand";
import { Model } from "./Model";
import { List } from "lodash";
import _ from "lodash";


interface robotProps {
    typeId: TypeId;
    brand: Brand;
    model: Model;
    taskCategory: TaskCategory
}

export class RobotType extends AggregateRoot<robotProps> {

  get id (): UniqueEntityID {
          return this._id;
        }
        get typeId (): TypeId {
          return this.props.typeId;
        }
      
        get brand (): Brand {
          return this.props.brand;
        }
      
        get model (): Model {
          return this.props.model;
        }

        get taskCategory (): TaskCategory {
          return this.props.taskCategory;
        }
      
        set typeId (value: TypeId) {
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
          const taskCategory = robotDTO.taskCategory;

          const robot = new RobotType (
            {
              typeId: TypeId.create({typeId}).getValue(),
              brand: Brand.create({ brand }).getValue(),
              model: Model.create({ model }).getValue(),
              taskCategory: TaskCategory.create({ category: taskCategory as TaskCategoryType}).getValue(),
            },
            id
          );
          return Result.ok<RobotType>(robot);
        }
      }
      
      
      
      
      
      
      