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
        let map = Array.from(Array(this.props.height+1), () => new Array(this.props.width+1).fill(0));


// Set outer walls
        for (let i = 0; i < this.props.height+1; i++) {
            map[i][0] = 1; // West wall
            map[i][this.props.width] = 1; // East wall
        }

        for (let j = 0; j < this.props.width+1; j++) {
            map[0][j] = 2; // North wall
            map[this.props.height][j] = 2; // South wall
        }

        // Set room walls
        for (let room of this.props.rooms) {
            for (let i = room.originCoordinateY; i <= room.destinationCoordinateY; i++) {
                for (let j = room.originCoordinateX; j <= room.destinationCoordinateX; j++) {
                    // If it's within the room borders, mark it as 0 (inside the room)
                    if (i > room.originCoordinateY && i < room.destinationCoordinateY &&
                      j > room.originCoordinateX && j < room.destinationCoordinateX) {
                        map[i][j] = 0;
                    } else {
                        // If it's on the border, mark it as 1 (room wall)
                        map[i][j] = 1;
                    }
                }
            }
        }




        // Set the top right cell to 1 and the top left cell to 3
        map[0][this.props.width] = 1; // Top right cell
        map[0][0] = 3; // Top left cell
        map[this.props.height][this.props.width] = 0; // Bottom right cell
        map[this.props.height][0] = 2; // Bottom left cell

        // Loop over connections and mark them on the map
        for (let connection of this.props.connections) {
            map[connection.locationY][connection.locationX] = 0;
            map[connection.locationToY][connection.locationToX] = 0;
        }

        // Loop over elevators and mark them on the map
        for (let elevator of this.props.elevators) {
            map[elevator.locationY.locationY][elevator.locationX.locationX] = 0;
        }

        // Loop over accesses and mark them on the map
        for (let access of this.props.connections) {
            map[access.locationY][access.locationX] = 0;
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
