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
    });