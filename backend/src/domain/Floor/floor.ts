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
import { Connection } from "../Connection/connection";
import IConnectionDTO from "../../dto/IConnectionDTO";
import { Room } from "../Room/room";
import { Elevator } from "../Elevator/elevator";

interface FloorProps {
    //floorId is a value object that is unique, and the first parts equals the building name and the second the floor number.
    buildingId?: string;
    floorNumber?: FloorNumber;
    floorId?: string;
    width?: number;
    height?: number;
    floorDescription?: FloorDescription;
    connections?: Connection[];
    rooms?: Room[];
    elevators?: Elevator[];
}

export class Floor extends AggregateRoot<FloorProps> {

    get id (): UniqueEntityID {
        return this._id;
    }

    get buildingId (): string {
        return this.props.buildingId;
    }

    get floorId (): string {
        return this.props.floorId;
    }

    get width (): number {
        return this.props.width;
    }

    get height (): number {
        return this.props.height;
    }

    get map (): number[][] {
        // Initialize the map with empty strings
        let map = Array.from(Array(this.props.height), () => new Array(this.props.width).fill(0));

        // Loop over connections and mark them on the map
        for (let connection of this.props.connections) {
            map[connection.locationY][connection.locationX] = 2;
            map[connection.locationToY][connection.locationToX] = 2;
        }

        // Loop over rooms and mark them on the map
        for (let room of this.props.rooms) {
            for (let x = room.originCoordinateX; x <= room.destinationCoordinateX; x++) {
                for (let y = room.originCoordinateY; y <= room.destinationCoordinateY; y++) {
                    map[y][x] = 3;
                }
            }
            // Mark the door on the map
            map[room.door.doorY][room.door.doorX] = 1;
        }

        // Loop over elevators and mark them on the map
        for (let elevator of this.props.elevators) {
            map[elevator.locationY.locationY][elevator.locationX.locationX] = 1;
        }

        return map;
    }

    get floorNumber (): FloorNumber {
        return this.props.floorNumber;
    }

    get floorDescription (): FloorDescription {
        return this.props.floorDescription;
    }

    set width (value: number) {
        this.props.width = value;
    }

    set height (value: number) {
        this.props.height = value;
    }

    get elevators (): Elevator[] {
        return this.props.elevators;
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

    set connections (value: Connection[]) {
        this.props.connections = value;
    }

    get connections (): Connection[] {
        return this.props.connections;
    }

    set rooms (value: Room[]) {
        this.props.rooms = value;
    }

    get rooms (): Room[] {
        return this.props.rooms;
    }

    set elevators (value: Elevator[]) {
        this.props.elevators = value;
    }

    // Add connection to floor
    // Add floor to building
    public addConnection(connection: Connection): void {
        this.props.connections = [...this.props.connections, connection];
    }

    public addElevator(elevator: Elevator): void {
        this.props.elevators = [...this.props.elevators, elevator];
    }

    public addRoom(room: Room): void {
        this.props.rooms = [...this.props.rooms, room];
    }
    private constructor (props: FloorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(floorDTO: IFloorDTO, id?: UniqueEntityID): Result<Floor> {
        const buildingId = floorDTO.buildingId;
        const floorNumber = floorDTO.floorNumber;
        const floorId = floorDTO.floorId;
        const floorDescription = floorDTO.floorDescription;
        const width = floorDTO.width;
        const height = floorDTO.height;


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
              floorDescription: FloorDescription.create({ floorDescription }).getValue(),
              width: width,
              height: height,
              connections: floorDTO.connections.map(connection => Connection.create(connection).getValue()),
              rooms: floorDTO.rooms.map(room => Room.create(room).getValue()),
              elevators: floorDTO.elevators.map(elevator => Elevator.create(elevator).getValue()),
          },
            id
        );
        return Result.ok<Floor>(floor);
    }
}
