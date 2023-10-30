import { Result } from "../../core/logic/Result";
import IElevatorDTO from "../../dto/IElevatorDTO";

export default interface IElevatorService {
    createElevator(elevatorId: string, elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
    getElevator(elevatorId: string): Promise<Result<IElevatorDTO>>;
    getElevators(): Promise<Result<IElevatorDTO[]>>;
    deleteElevator(elevatorId: string): Promise<Result<boolean>>;
    updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
}