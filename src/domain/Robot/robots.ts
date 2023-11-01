import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { IdRobots } from "./IdRobots";
import { NameRobots } from "./NameRobots";
import { TypeOfRobots } from "./TypeOfRobot";
import { SerialNumber } from "./SerialNumber";
import { Description } from "./Description";
import IRobotDTO from "../../dto/IRobotDTO";



interface robots {
    idRobot: IdRobots;
    robotName: NameRobots;
    typeOfRobot: TypeOfRobots;
    serialNumber: SerialNumber;
    description: Description;
    active?: boolean;
}

export class Robots extends AggregateRoot<robots> {


    get id (): UniqueEntityID {
        return this._id;
    }
    get idRobot (): IdRobots {
        return this.props.idRobot;
    }

    get name (): NameRobots {
        return this.props.robotName;
    }

    get typeOfRobot (): TypeOfRobots {
        return this.props.typeOfRobot;
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

    private constructor(props: robots, id?: UniqueEntityID) {
        super(props, id);
    }


    public static create (robotDTO: IRobotDTO, id?: UniqueEntityID): Result<Robots> {

        const idRobot = robotDTO.idRobot;
        const robotName = robotDTO.robotName;
        const typeOfRobots = robotDTO.typeOfRobot;
        const serialNumber = robotDTO.serialNumber;
        const description =robotDTO.description;
        const active = robotDTO.active;

        const robot = new Robots (
            {
                idRobot: IdRobots.create({idRobot}).getValue(),
                robotName: NameRobots.create({robotName}).getValue(),
                typeOfRobot: TypeOfRobots.create({ typeOfRobots }).getValue(),
                serialNumber: SerialNumber.create({ serialNumber }).getValue(),
                description: Description.create({ description }).getValue(), },
                    id
        );
        return Result.ok<Robots>(robot);
        }
    }







