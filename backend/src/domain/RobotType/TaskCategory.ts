import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";


export enum TaskCategoryType {
    Vigilance = "Vigilance",
    PickUpAndDelivery = "PickUpAndDelivery",
}

interface TaskCategoryProps {
    category: TaskCategoryType;
}

export class TaskCategory extends ValueObject<TaskCategoryProps> {
    get category(): TaskCategoryType {
        return this.props.category;
    }

    private constructor(props: TaskCategoryProps) {
        super(props);
    }

    public static create(props: TaskCategoryProps): Result<TaskCategory> {
        const guardResult = Guard.againstNullOrUndefined(props.category, "category");

        if (!guardResult.succeeded) {
            return Result.fail<TaskCategory>(guardResult.message);
        }

        // Additional checks for the specific category criteria if needed.
        if (!Object.values(TaskCategoryType).includes(props.category)) {
            return Result.fail<TaskCategory>("Invalid task category.");
        }

        return Result.ok<TaskCategory>(new TaskCategory(props));
    }
}