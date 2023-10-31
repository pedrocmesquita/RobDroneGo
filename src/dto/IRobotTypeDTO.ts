import { List } from "lodash";

export default interface IRobotTypeDTO {
    typeId: string;
    brand: string;
    model: string;
    tasks: List<String>;
}
