
import { Result } from "../../../src/core/logic/Result";
import {TypeId} from "../../../src/domain/RobotType/TypeId";
import {RobotType} from "../../../src/domain/RobotType/RobotType";
import {Brand} from "../../../src/domain/RobotType/Brand";
import {Model} from "../../../src/domain/RobotType/Model";
import {TaskCategory} from "../../../src/domain/RobotType/TaskCategory";



describe('RobotType', () => {
    let robotType: RobotType;

    beforeEach(() => {
        robotType = RobotType.create({
            typeId: '1',
            brand: 'TestBrand',
            model: 'TestModel',
            taskCategory: 'Vigilance',
        }).getValue();

    });


    it('expects that typeId is not empty', () => {
            TypeId.create({typeId: ''}).isFailure;
        }
    );
    it('expects that typeId is not null', () => {
            TypeId.create({typeId: null}).isFailure;
        }

    );

    it('expects that typeId is not undefined', () => {
            TypeId.create({typeId: undefined}).isFailure;
        }
    );

    it('expects that typeId is not longer than 50 characters', () => {
            TypeId.create({typeId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}).isFailure;
        }
    );

    it('expects that brand is not empty', () => {
            Brand.create({brand: ''}).isFailure;
        }
    );

    it('expects that brand is not null', () => {
            Brand.create({brand: null}).isFailure;
        }
    );

    it('expects that brand is not undefined', () => {
            Brand.create({brand: undefined}).isFailure;
        }
    );

    it('expects that brand is not longer than 50 characters', () => {
            Brand.create({brand: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}).isFailure;
        }
    );

    it('expects that model is not empty', () => {
            Model.create({model: ''}).isFailure;
        }
    );

    it('expects that model is not null', () => {
            Model.create({model: null}).isFailure;
        }
    );

    it('expects that model is not undefined', () => {
            Model.create({model: undefined}).isFailure;
        }
    );

    it('expects that model is not longer than 50 characters', () => {
            Model.create({model: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}).isFailure;
        }
    );
});