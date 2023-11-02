import { floor } from "lodash";
import { Building } from "../Building/building";
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { BuildingId } from "../Building/buildingId";
import { FloorNumber } from "./floorNumber";
import { FloorDescription } from "./floorDescription";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import IFloorDTO from "../../dto/IFloorDTO";
import { AggregateRoot } from "../../core/domain/AggregateRoot";

interface FloorProps {
    //floorId is a value object that is unique, and the first parts equals the building name and the second the floor number.
    buildingId?: string;
    floorNumber?: FloorNumber;
    floorId?: string;
    floorDescription?: FloorDescription;
    connections?: string[];
}

export class Floor extends ValueObject<FloorProps> {

    get buildingId (): string {
        return this.props.buildingId;
    }

    get floorId (): string {
        return this.props.floorId;
    }

    get floorNumber (): FloorNumber {
        return this.props.floorNumber;
    }

    get floorDescription (): FloorDescription {
        return this.props.floorDescription;
    }

    get connections (): string[] {
        return this.props.connections;
    }

    set buildingId (value: string) {
        this.props.buildingId = value;
    }

    set floorId (value: string) {
        this.props.floorId = value;
    }

    set floorNumber (value: FloorNumber) {
        this.props.floorNumber = value;
    }

    set floorDescription (value: FloorDescription) {
        this.props.floorDescription = value;
    }

    set connections (value: string[]) {
        this.props.connections = value;
    }

    public addConnection(connectionId: string): void {
        this.props.connections = [...this.props.connections, connectionId];
    }

    private constructor (props: FloorProps) {
        super(props);
    }

    public static create(floorDTO: IFloorDTO, id?: UniqueEntityID): Result<Floor> {
        const buildingId = floorDTO.buildingId;
        const floorNumber = floorDTO.floorNumber;
        const floorId = floorDTO.floorId;
        const floorDescription = floorDTO.floorDescription;

        // Floor id is the concatenation of buildingId and floorNumber


        // Check if buildingId and floorId are defined and not empty
        if (buildingId === undefined || buildingId.length === 0) {
            return Result.fail<Floor>('BuildingID is required');
        }

        if (floorId === undefined || floorId.length === 0) {
            return Result.fail<Floor>('FloorID is required');
        }

        // Check if floorNumber is the concatenation of buildingId and floorNumber
        if (floorId !== buildingId+"-"+floorNumber) {
            return Result.fail<Floor>('FloorID must be the concatenation of buildingId and floorNumber');
        }

        const floor = new Floor(
          {
              buildingId: buildingId,
              floorNumber: FloorNumber.create({ floorNumber }).getValue(),
              floorId: floorId,
              floorDescription: FloorDescription.create({ floorDescription }).getValue()
          }
        );
        return Result.ok<Floor>(floor);
    }
}
