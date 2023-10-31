import { List } from "lodash";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";



interface TasksProps{
    taskId: string;
    taskTypeId: string;
    
}

export class Task extends AggregateRoot<TasksProps>{
    static createList(tasks: List<String>) {
      throw new Error("Method not implemented.");
    }

    public get taskId(): string{
        return this.props.taskId;
    }

    public get taskTypeId(): string{
        return this.props.taskTypeId;
    }



    public constructor (props: TasksProps ) {
        const combinedId = `${props.taskId}-${props.taskTypeId}`;
        super(props, new UniqueEntityID(combinedId));
    }

    public static create (props: TasksProps): Result<TasksProps> {
        const guardedProps = [{argument: props.taskId, argumentName: 'taskId'},{argument: props.taskTypeId, argumentName: 'taskTypeId'}];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
          return Result.fail<Task>(guardResult.message);
        }else {
          return Result.ok<Task>(new Task(props));
        }
    }
}
