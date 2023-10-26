import { Repo } from "../../core/infra/Repo";
import { Elevator } from "../../domain/Building/elevator";

export default interface IElevatorRepo extends Repo<Elevator> {
    save(elevator: Elevator): Promise<Elevator>;
    findByElevatorId (elevatorId: string): Promise<Elevator>;
    update(elevator: Elevator): Promise<Elevator>;
    delete(elevator: Elevator): Promise<Elevator>;
    getElevators(): Promise<Elevator[]>;
    getElevatorsByBuildingId(buildingId: string): Promise<Elevator[]>;
}