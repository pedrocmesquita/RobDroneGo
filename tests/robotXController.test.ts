import RobotController from "../src/controllers/robotController";
import IRobotService from "../src/services/IServices/IRobotService";
import IRobotDTO from "../src/dto/IRobotDTO";
import { Result } from '../src/core/logic/Result';
import {Robots} from "../src/domain/Robot/Robots";

/*describe("robotController", () => {
    let robotControllerInstance: RobotController;
    let mockRobotService: IRobotService;
    let mockRobotDTO: IRobotDTO;
    let robot: Robots;
    beforeEach(() => {
        mockRobotService = {
            createRobot: jest.fn(),
            getRobots: jest.fn(),
            inibirRobot: jest.fn(),
        };
        robotControllerInstance = new RobotController(mockRobotService);
    });

    describe("createRobot", () => {
        it("should return a 201 status code and the created robot if successful", async () => {
            const mockRequest      = {
                params: {
                    idRobot: "123" as string,
                },
                body: {
                    active: false,
                    description: "asd",
                    serialNumber: "123",
                    idRobot: "123",
                    robotName: "testRobot",
                    typeId: "testType"
                }as IRobotDTO,
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockNextFunction = jest.fn();

            const mockRobotDTO: IRobotDTO = {
                active: false, description: "asd", serialNumber: "123",
                idRobot: "123",
                robotName: "testRobot",
                typeId: "testType"

            };
            const mockResult: Result<IRobotDTO> = Result.ok(mockRobotDTO);

            mockRobotService.createRobot = jest.fn().mockResolvedValue(mockResult);

            await robotControllerInstance.createRobot(mockRequest, mockResponse, mockNextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockRobotDTO);
        });

        it("should return a 404 status code if the robot creation fails", async () => {
            const mockRequest = {
                params: {
                    idRobot: "123",
                },
                body: {
                    name: "testRobot",
                    type: "testType",
                },
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            const mockNextFunction = jest.fn();

            const mockResult: Result<IRobotDTO> = Result.fail("Error");

            mockRobotService.createRobot = jest.fn().mockResolvedValue(mockResult);

            await robotControllerInstance.createRobot(
                mockRequest,
                mockRobotService,
                mockNextFunction
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.send).toHaveBeenCalled();
        });
    });

    describe("getRobots", () => {
        it("should return a 200 status code and all robots if successful", async () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockNextFunction = jest.fn();

            const mockRobotDTO: IRobotDTO[] = [
                {
                    active: false, description: "asd", serialNumber: "123",
                    idRobot: "123",
                    robotName: "testRobot",
                    typeId: "testType"
                },
            ];
            const mockResult: Result<IRobotDTO[]> = Result.ok(mockRobotDTO);

            mockRobotService.getRobots = jest.fn().mockResolvedValue(mockResult);

            await robotControllerInstance.getRobots(
                mockRequest,
                mockResponse,
                mockNextFunction
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockRobotDTO);
        });

        it("should return a 404 status code if no robots are found", async () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            const mockNextFunction = jest.fn();

            const mockResult: Result<IRobotDTO[]> = Result.fail("Error");

            mockRobotService.getRobots = jest.fn().mockResolvedValue(mockResult);

            await robotControllerInstance.getRobots(
                mockRequest,
                mockResponse,
                mockNextFunction
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.send).toHaveBeenCalled();
        });
    });

    describe("inibRobot", () => {
        it("should return a 201 status code and the inhibited robot if successful", async () => {
            const mockRequest = {
                params: {
                    idRobot: "123",
                },
                body: {},
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockNextFunction = jest.fn();

            const mockRobotDTO: IRobotDTO = {
                active: false, description: "asd", serialNumber: "123",
                idRobot: "123",
                robotName: "testRobot",
                typeId: "testType"
            };
            const mockResult: Result<IRobotDTO> = Result.ok(mockRobotDTO);

            mockRobotService.inibirRobot = jest.fn().mockResolvedValue(mockResult);
        });
    });
});*/
