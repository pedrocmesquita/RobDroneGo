import { Repo } from "../../core/infra/Repo";
import { Elevator } from "../../domain/Elevator/elevator";
import { ElevatorId } from "../../domain/Elevator/elevatorId";

export default interface IElevatorRepo extends Repo<Elevator> {
    save(elevator: Elevator): Promise<Elevator>;
    getElevators(): Promise<Elevator[]>;
    findByElevatorId(elevatorId: ElevatorId | string): Promise<Elevator>;
    update(elevator: Elevator): Promise<Elevator>;
    delete(elevatorId: string): Promise<void>;
    deleteAllElevatorsFromFloor(floorId: string): void;
}