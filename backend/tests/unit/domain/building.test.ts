import { Building } from '../../../src/domain/Building/building';
import { Floor } from '../../../src/domain/Floor/floor';
import { Connection } from '../../../src/domain/Connection/connection';
import { Elevator } from '../../../src/domain/Elevator/elevator';
import { Room } from '../../../src/domain/Room/room';
import { expect } from 'chai';
import { Result } from "../../../src/core/logic/Result";
import { BuildingId } from '../../../src/domain/Building/buildingId';
import { BuildingName } from '../../../src/domain/Building/buildingName';
import { BuildingDescription } from '../../../src/domain/Building/buildingDescription';
import { BuildingNumberOfFloors } from '../../../src/domain/Building/buildingNumberOfFloors';


describe('Building', () => {
  let building: Building;
  let floor: Floor;
  let connection: Connection;
  let elevator: Elevator;
  let room: Room;

  beforeEach(() => {
    building = Building.create({
      buildingId: 'AB',
      buildingName: 'Building 1',
      buildingDescription: 'Test Building',
      buildingNumberOfFloors: 3,
      dimX: 4,
      dimY: 5,
      wallHeight: 3,
      wallWidth: 3,
      floors: []
    }).getValue();

    floor = Floor.create({
      buildingId: 'AB',
      floorId: 'AB-1',
      floorNumber: 1,
      floorDescription: 'Test Floor',
      connections: [],
      rooms: [],
      elevators: []
    }).getValue();
    
    connection = Connection.create({
      connectionId: '1',
      buildingfromId: '1',
      buildingtoId: '1',
      floorfromId: '1',
      floortoId: '1',
      locationX: 1,
      locationY: 1,
      locationToX: 1,
      locationToY: 1
    }).getValue();


    room = Room.create({
      roomId: '1',
      floorId: '1',
      roomName: 'Test Room',
      roomDescription: 'Test Description',
      roomCategory: 'Gabinete',
      doorX: 1,
      doorY: 1,
      originCoordinateX: 1,
      originCoordinateY: 1,
      destinationCoordinateX: 1,
      destinationCoordinateY: 1,
    }).getValue();
  });

  it('addFloor adds a floor to the building', () => {
    building.addFloor(floor);
    expect(building.floors).contain(floor);
  });

  it('addConnectionToFloor adds a connection to a floor in the building', () => {
    building.addFloor(floor);
    building.addConnectionToFloor(floor.floorId, connection);
    expect(floor.connections).contain(connection);
  });

  it('addRoomToFloor adds a room to a floor in the building', () => {
    building.addFloor(floor);
    building.addRoomToFloor(floor.floorId, room);
    expect(floor.rooms).contain(room);
  });


  it('removeFloor removes a floor from the building', () => {
    building.addFloor(floor);
    building.removeFloor(floor);
    expect(building.floors).not.contain(floor);
  });

  it('expects that buildingName is not empty', () => {
    BuildingName.create({buildingName: ''}).isFailure;
  }
  );

  it('expects that buildingName is not null', () => {
    BuildingName.create({buildingName: null}).isFailure;
  }
  );

  it('expects that buildingName is not undefined', () => {
    BuildingName.create({buildingName: undefined}).isFailure;
  }
  );

  it('expects that buildingName is not longer than 50 characters', () => {
    BuildingName.create({buildingName: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}).isFailure;
  }
  );

  it('expects that buildingDescription is not empty', () => {
    BuildingDescription.create({buildingDescription: ''}).isFailure;
  }
  );

  it('expects that buildingDescription is not null', () => {
    BuildingDescription.create({buildingDescription: null}).isFailure;
  }
  );

  it('expects that buildingDescription is not undefined', () => {
    BuildingDescription.create({buildingDescription: undefined}).isFailure;
  }
  );

  it('expects that buildingDescription is not longer than 200 characters', () => {
    BuildingDescription.create({buildingDescription: 'a'.repeat(201)}).isFailure;
  }
  );

  it('expects that buildingNumberOfFloors is not null', () => {
    BuildingNumberOfFloors.create({buildingNumberOfFloors: null}).isFailure;
  }
  );

  it('expects that buildingNumberOfFloors is not undefined', () => {
    BuildingNumberOfFloors.create({buildingNumberOfFloors: undefined}).isFailure;
  }
  );

  it('expects that buildingNumberOfFloors is not less than 1', () => {
    BuildingNumberOfFloors.create({buildingNumberOfFloors: 0}).isFailure;
  }
  );

  it('expects that buildingNumberOfFloors is not greater than 500', () => {
    BuildingNumberOfFloors.create({buildingNumberOfFloors: 501}).isFailure;
  }
  );

  it('expects that buildingNumberOfFloors is not a decimal number', () => {
    BuildingNumberOfFloors.create({buildingNumberOfFloors: 1.5}).isFailure;
  }
  );

  it('expects that buildingNumberOfFloors is not a negative number', () => {
    BuildingNumberOfFloors.create({buildingNumberOfFloors: -1}).isFailure;
  }
  );
});