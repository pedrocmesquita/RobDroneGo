export interface IElevatorPersistence {
    elevatorId: string;
    floorsAttended: string[];
    elevatorBrand: string;
    elevatorModel: string;
    elevatorSerNum: string;
    elevatorDesc: string;
    currentFloor: number;
    locationX: number;
    locationY: number;
}