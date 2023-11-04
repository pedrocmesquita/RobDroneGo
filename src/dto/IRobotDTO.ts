export default interface IRobotDTO {
    idRobot: string;
    robotName: string;
    typeId: string;
    serialNumber: string;
    description: string;
    active?: boolean;
}