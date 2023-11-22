import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { IdRobots } from "./IdRobots";
import { NameRobots } from "./NameRobots";

import { SerialNumber } from "./SerialNumber";
import { Description } from "./Description";
import IRobotDTO from "../../dto/IRobotDTO";



interface robotsProps {
    idRobot: IdRobots;
    robotName: NameRobots;
    typeId: string;
    serialNumber: SerialNumber;
    description: Description;
    active?: boolean;
}

export class Robots extends AggregateRoot<robotsProps> {


    get id (): UniqueEntityID {
        return this._id;
    }
    get idRobot (): IdRobots {
        return this.props.idRobot;
    }

    get robotName (): NameRobots {
        return this.props.robotName;
    }

    get typeId (): string {
        return this.props.typeId;
    }

    get serialNumber (): SerialNumber {
        return this.props.serialNumber;
    }

    get description (): Description {
        return this.props.description;
    }

    get active (): boolean {
        return this.props.active;
    }

    private constructor(props: robotsProps, id?: UniqueEntityID) {
        super(props, id);
    }


    public static create (robotDTO: IRobotDTO, id?: UniqueEntityID): Result<Robots> {

        const idRobot = robotDTO.idRobot;
        const robotName = robotDTO.robotName;
        const typeId = robotDTO.typeId;
        const serialNumber = robotDTO.serialNumber;
        const description =robotDTO.description;
        const active = robotDTO.active;

        const robot = new Robots (
            {
                idRobot: IdRobots.create({idRobot}).getValue(),
                robotName: NameRobots.create({robotName}).getValue(),
                typeId: typeId,
                serialNumber: SerialNumber.create({ serialNumber }).getValue(),
                description: Description.create({ description }).getValue(),
                active: active}
            , id
        );
        return Result.ok<Robots>(robot);
        }
    }







