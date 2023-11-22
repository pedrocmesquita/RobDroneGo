import { Floor } from '../../../src/domain/Floor/floor';
import { Connection } from '../../../src/domain/Connection/connection';
import { Room } from '../../../src/domain/Room/room';
import { expect } from 'chai';
import { FloorNumber } from '../../../src/domain/Floor/floorNumber';
import { FloorDescription } from '../../../src/domain/Floor/floorDescription';


describe('Floor', () => {
    let floor: Floor;
    
    beforeEach(() => {
        floor = Floor.create({
        buildingId: 'AB',
        floorId: 'AB-1',
        floorNumber: 1,
        floorDescription: 'Test Floor',
        connections: [],
        rooms: [] ,
            elevators: []
        }).getValue();
    });
    
    it('should create a floor', () => {
        expect(floor).to.be.instanceOf(Floor);
    });

    it('should return the floorId', () => {
        expect(floor.floorId).to.equal('AB-1');
    });

    it('should return the floorNumber', () => {
        expect(floor.floorNumber.floorNumber).to.equal(1);
    });

    it('should return the floorDescription', () => {
        expect(floor.floorDescription.floorDescription).to.equal('Test Floor');
    });

    it('should return the connections', () => {
        expect(floor.connections).to.deep.equal([]);
    });

    it('should return the rooms', () => {
        expect(floor.rooms).to.deep.equal([]);
    });

    it('should return the buildingId', () => {
        expect(floor.buildingId).to.equal('AB');
    });

    const FloorNumberProps = {
        floorNumber: 1
    };

    it('should set the floorNumber', () => {
        const floorNumber = FloorNumber.create(FloorNumberProps).getValue();
        floor.floorNumber = floorNumber;
        expect(floor.floorNumber).to.equal(floorNumber);
    });

    const FloorDescriptionProps = {
        floorDescription: 'Test Floor Description'
    };

    it('should set the floorDescription', () => {
        const floorDescription = FloorDescription.create(FloorDescriptionProps).getValue();
        floor.floorDescription = floorDescription;
        expect(floor.floorDescription).to.equal(floorDescription);
    });

    it('does not allow a floorNumber less than -100', () => {
        const floorNumber = FloorNumber.create({floorNumber: -101}).errorValue();
        expect(floorNumber).to.equal('The floorNumber must be between -100 and 500.');
    });
    
    it('does not allow a floorNumber greater than 500', () => {
        const floorNumber = FloorNumber.create({floorNumber: 501}).errorValue();
        expect(floorNumber).to.equal('The floorNumber must be between -100 and 500.');
    });

    it('expects the floorId to be the concatenation of the buildingId and the floorNumber', () => {
        const floorNumber = FloorNumber.create({floorNumber: 1}).getValue();
        floor.floorNumber = floorNumber;
        expect(floor.floorId).to.equal('AB-1');
    });

    it('expects the floorDescription to be less than 255 alphanumeric characters', () => {
        const floorDescription = FloorDescription.create({floorDescription: 'a'.repeat(256)}).errorValue();
        expect(floorDescription).to.equal('The description has more than 255 alphanumeric characters.');
    });

});




    

    

    



