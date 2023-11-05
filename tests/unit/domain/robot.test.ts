import {Robots} from "../../../src/domain/Robot/Robots";
import {SerialNumber} from "../../../src/domain/Robot/SerialNumber";
import {NameRobots} from "../../../src/domain/Robot/NameRobots";
import {Description} from "../../../src/domain/Robot/Description";

describe('Robot', () => {
    let robot: Robots;

    beforeEach(() => {
        robot = Robots.create({
            idRobot: '1',
            typeId: '1',
            serialNumber: 'TestSerialNumber',
            description: 'TestDescription',
            robotName: 'TestRobotName',
            active: true,
        }).getValue();

    });

    it('create a robot', () => {
        expect(robot.idRobot.idRobot.toString()).toBe('1');
        expect(robot.typeId).toBe('1');
        expect(robot.serialNumber.serialNumber).toBe('TestSerialNumber');
        expect(robot.description.description).toBe('TestDescription');
        expect(robot.robotName.robotName).toBe('TestRobotName');
        expect(robot.active).toBe(true);
    });
    it('should not have null attributes', () => {
        expect(robot.typeId).not.toBe("");
        expect(robot.serialNumber.serialNumber).not.toBe("");
        expect(robot.description.description).not.toBe("");
        expect(robot.robotName.robotName).not.toBe("");
});
    it('expects that serialNumber is not empty', () => {
            SerialNumber.create({serialNumber: ''}).isFailure;
    }
    );
    it('expects that serialNumber is not null', () => {
            SerialNumber.create({serialNumber: null}).isFailure;
    }
    );
    it('expects that serialNumber is not undefined', () => {
            SerialNumber.create({serialNumber: undefined}).isFailure;
    }
    );
    it('expects that serialNumber is not longer than 50 characters', () => {
            SerialNumber.create({serialNumber: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}).isFailure;
    }
    );
    it('expects that robotName is not empty', () => {
            NameRobots.create({robotName: ''}).isFailure;
    }
    );
    it('expects that robotName is not null', () => {
            NameRobots.create({robotName: null}).isFailure;
    }
    );
    it('expects that robotName is not undefined', () => {
            NameRobots.create({robotName: undefined}).isFailure;
    }
    );
    it('expects that robotName is not longer than 50 characters', () => {
            NameRobots.create({robotName: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}).isFailure;
    }
    );
    it('expects that description is not empty', () => {
            Description.create({description: ''}).isFailure;

    }
    );
    it('expects that description is not null', () => {
            Description.create({description: null}).isFailure;
    }
    );
    it('expects that description is not undefined', () => {
            Description.create({description: undefined}).isFailure;
    }
    );
    it('expects that description is not longer than 200 characters', () => {
            Description.create({description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}).isFailure;
    }
    );
    it('expects that active is not null', () => {
            expect(robot.active).not.toBe(null);
    }
    );
    it('expects that active is not undefined', () => {
            expect(robot.active).not.toBe(undefined);
    }
    );
    it('expects that active is not longer than 200 characters', () => {
            expect(robot.active).not.toBe(false);
    }
    );
    it('expects that idRobot is not empty', () => {
            expect(robot.idRobot.idRobot).not.toBe("");
    }
    );
    it('expects that idRobot is not null', () => {
            expect(robot.idRobot.idRobot).not.toBe(null);
    }
    );
    it('expects that idRobot is not undefined', () => {
            expect(robot.idRobot.idRobot).not.toBe(undefined);
    }
    );
    it('expects that typeId is not empty', () => {
            expect(robot.typeId).not.toBe("");
    }
    );
    it('expects that typeId is not null', () => {
            expect(robot.typeId).not.toBe(null);
    }
    );
    it('expects that typeId is not undefined', () => {
            expect(robot.typeId).not.toBe(undefined);
    }
    );
    });