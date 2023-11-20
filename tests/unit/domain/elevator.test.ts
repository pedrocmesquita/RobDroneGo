import { Elevator } from "../../../src/domain/Elevator/elevator";
import { expect } from 'chai';
import { LocationY } from "../../../src/domain/Elevator/locationY";
import { LocationX } from "../../../src/domain/Elevator/locationX";
import { CurrentFloor } from "../../../src/domain/Elevator/currentFloor";
import { ElevatorDesc } from "../../../src/domain/Elevator/elevatorDesc";
import { ElevatorSerNum } from "../../../src/domain/Elevator/elevatorSerNum";
import { ElevatorModel } from "../../../src/domain/Elevator/elevatorModel";
import { ElevatorBrand } from "../../../src/domain/Elevator/elevatorBrand";
describe ( 'Elevator', () => {
  let elevator: Elevator;

  beforeEach(() => {
    elevator = Elevator.create({
      elevatorId: '1',
      floorsAttended: ['1'],
      elevatorBrand : 'Test Brand',
      elevatorModel: 'Test Model',
      elevatorSerNum: 'Test Serial Number',
      elevatorDesc: 'Test Description',
      currentFloor: 1,
      locationX: 1,
      locationY: 1
    }).getValue();
  });

  it('should create an elevator', () => {
    expect(elevator).to.be.instanceOf(Elevator);
  });

  it('should return the elevatorId', () => {
    expect(elevator.elevatorId.elevatorId).to.equal('1');
  });


  it('should return the elevatorBrand', () => {
    expect(elevator.elevatorBrand.elevatorBrand).to.equal('Test Brand');
  });

  it('should return the elevatorModel', () => {
    expect(elevator.elevatorModel.elevatorModel).to.equal('Test Model');
  });

  it('should return the elevatorSerNum', () => {
    expect(elevator.elevatorSerNum.elevatorSerNum).to.equal('Test Serial Number');
  });

  it('should return the elevatorDesc', () => {
    expect(elevator.elevatorDesc.elevatorDesc).to.equal('Test Description');
  });

  it('should return the currentFloor', () => {
    expect(elevator.currentFloor.currentFloor).to.equal(1);
  });

  it('should return the locationX', () => {
    expect(elevator.locationX.locationX).to.equal(1);
  });

  it('should return the locationY', () => {
    expect(elevator.locationY.locationY).to.equal(1);
  });
});