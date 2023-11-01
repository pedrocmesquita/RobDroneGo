export default interface IRobotDTO {
    idRobot: string;
    robotName: string;
    typeOfRobot: string;
    serialNumber: string;
    description: string;
    active?: boolean;
}