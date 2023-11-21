import { Room } from "../../../src/domain/Room/room";
import { expect } from 'chai';
import { Door } from "../../../src/domain/Room/door";
import { RoomCategory } from "../../../src/domain/Room/roomCategory";
import { RoomDescription } from "../../../src/domain/Room/roomDescription";
import { RoomName } from "../../../src/domain/Room/roomName";

describe ('Room', () => {
  let room: Room;

  beforeEach(() => {
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

  it('should create a room', () => {
    expect(room).to.be.instanceOf(Room);
  });

  it('should return the roomId', () => {
    expect(room.roomId).to.equal('1');
  });

  it('should return the floorId', () => {
    expect(room.floorId).to.equal('1');
  });

  it('should return the roomName', () => {
    expect(room.roomName.roomName).to.equal('Test Room');
  });

  it('should return the roomDescription', () => {
    expect(room.roomDescription.roomDescription).to.equal('Test Description');
  });

  it('should return the roomCategory', () => {
    expect(room.roomCategory.category).to.equal('Gabinete');
  });

  it('should return the doorX', () => {
    expect(room.door.doorX).to.equal(1);
  });

  it('should return the doorY', () => {
    expect(room.door.doorY).to.equal(1);
  });

const RoomNameProps = {
    roomName: 'Test Room Name'
  };

  it('should set the roomName', () => {
    const roomName = RoomName.create(RoomNameProps).getValue();
    room.roomName = roomName;
    expect(room.roomName).to.equal(roomName);
  });

const RoomDescriptionProps = {
    roomDescription: 'Test Room Description'
  };

  it('should set the roomDescription', () => {
    const roomDescription = RoomDescription.create(RoomDescriptionProps).getValue();
    room.roomDescription = roomDescription;
    expect(room.roomDescription).to.equal(roomDescription);
  });

const DoorProps = {
    doorX: 1,
    doorY: 1
  };

  it('should set the door', () => {
    const door = Door.create(DoorProps).getValue();
    room.door = door;
    expect(room.door).to.equal(door);
  });

  it('expects the roomDescription to be less than 255 alphanumeric characters', () => {
    const roomDescription = RoomDescription.create({roomDescription: 'a'.repeat(256)}).errorValue();
    expect(roomDescription).to.equal('The description has more than 255 alphanumeric characters.');
  });

  it("expects the roomName to be less than 50 alphanumeric characters", () => {
    const roomName = RoomName.create({roomName: 'a'.repeat(51)}).errorValue();
    expect(roomName).to.equal('RoomName must have a maximum of 50 characters.');
  });


});