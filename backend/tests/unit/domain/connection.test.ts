import { expect } from 'chai';
import { Connection } from "../../../src/domain/Connection/connection";

describe('Connection', () => {
  let connection: Connection;

  beforeEach(() => {
    connection = Connection.create({
      connectionId: '1',
      buildingfromId: '1',
      buildingtoId: '2',
      floorfromId: '1',
      floortoId: '2',
      locationX: 1,
      locationY: 1,
      locationToX: 2,
      locationToY: 2
    }).getValue();
  });

  it('should create a connection', () => {
    expect(connection).to.be.instanceOf(Connection);
  });

  it('should return the connectionId', () => {
    expect(connection.connectionId).to.equal('1');
  });

  it('should return the buildingfromId', () => {
    expect(connection.buildingfromId).to.equal('1');
  });

  it('should return the buildingtoId', () => {
    expect(connection.buildingtoId).to.equal('2');
  });

  it('should return the floorfromId', () => {
    expect(connection.floorfromId).to.equal('1');
  });

  it('should return the floortoId', () => {
    expect(connection.floortoId).to.equal('2');
  });

  it('should return the locationX', () => {
    expect(connection.locationX).to.equal(1);
  });

  it('should return the locationY', () => {
    expect(connection.locationY).to.equal(1);
  });

  it('should return the locationToX', () => {
    expect(connection.locationToX).to.equal(2);
  });

  it('should return the locationToY', () => {
    expect(connection.locationToY).to.equal(2);
  });
});