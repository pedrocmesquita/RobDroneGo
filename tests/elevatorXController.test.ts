import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IElevatorService from "../src/services/IServices/IElevatorService";
import ElevatorController from "../src/controllers/elevatorController";
import IElevatorDTO from '../src/dto/IElevatorDTO';
import { Elevator } from '../src/domain/Elevator/elevator';

describe('Elevator Controller', function () {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(10000);
    Container.reset();
    let elevatorSchemaInstance = require("../src/persistence/schemas/elevatorSchema").default;
    Container.set("elevatorSchema", elevatorSchemaInstance);

    let floorSchemaInstance = require("../src/persistence/schemas/floorSchema").default;
    Container.set("floorSchema", floorSchemaInstance);

    let buildingSchemaInstance = require("../src/persistence/schemas/buildingSchema").default;
    Container.set("buildingSchema", buildingSchemaInstance);

    let elevatorRepoClass = require("../src/repos/elevatorRepo").default;
    let elevatorRepoInstance = Container.get(elevatorRepoClass);
    Container.set("ElevatorRepo", elevatorRepoInstance);

    let floorRepoClass = require("../src/repos/floorRepo").default;
    let floorRepoInstance = Container.get(floorRepoClass);
    Container.set("FloorRepo", floorRepoInstance);

    let buildingRepoClass = require("../src/repos/buildingRepo").default;
    let buildingRepoInstance = Container.get(buildingRepoClass);
    Container.set("BuildingRepo", buildingRepoInstance);

    let elevatorServiceClass = require("../src/services/elevatorService").default;
    let elevatorServiceInstance = Container.get(elevatorServiceClass);
    Container.set("ElevatorService", elevatorServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('Creating an Elevator', async function () {
    // Arrange
    const body = {
      "buildingId":"1",
      "elevatorId":"1",
      "elevatorBrand":"1",
      "elevatorModel":"1",
      "elevatorSerNum":"1",
      "elevatorDesc":"1",
      "currentFloor":"1",
      "locationX":"1",
      "locationY":"1"
    };
    const req: Partial<Request> = { body };
    req.body = body;
    const res: Partial<Response> = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(), // To chain .json() after .status()
    };
    const next: Partial<NextFunction> = () => {};

    const elevatorServiceInstance = Container.get("ElevatorService");
    sinon.stub(elevatorServiceInstance, "createElevator").returns(
      Result.ok<IElevatorDTO>( {
        "buildingId":"1",
        "elevatorId":"1",
        "elevatorBrand":'1',
        "elevatorModel":'1',
        "elevatorSerNum":'1',
        "elevatorDesc":'1',
        "currentFloor":1,
        "locationX":1,
        "locationY":1
      })
    );

    const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

    // Act
    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({
      "buildingId": req.body.buildingId,
      "elevatorId": req.body.elevatorId,
      "elevatorBrand": req.body.elevatorBrand,
      "elevatorModel": req.body.elevatorModel,
      "elevatorSerNum": req.body.elevatorSerNum,
      "elevatorDesc": req.body.elevatorDesc,
      "currentFloor": req.body.currentFloor,
      "locationX": req.body.locationX,
      "locationY": req.body.locationY
    }));
  });

/*
  it('elevatorController + elevatorService integration test using elevatorRepoistory and Elevator stubs', async function () {
    // Arrange
    let body = { "name":'elevator12' };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    sinon.stub(Elevator, "create").returns(Result.ok({"id":"123", "name": req.body.name}));

    let elevatorRepoInstance = Container.get("ElevatorRepo");
    sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
      resolve(Elevator.create({"id":"123", "name": req.body.name}).getValue())
    }));

    let elevatorServiceInstance = Container.get("ElevatorService");

    const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

    // Act
    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ "id": "123","name": req.body.name}));
  });


  it('elevatorController + elevatorService integration test using spy on elevatorService', async function () {
    // Arrange
    let body = { "name":'elevator12' };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    let elevatorRepoInstance = Container.get("ElevatorRepo");
    sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
      resolve(Elevator.create({"id":"123", "name": req.body.name}).getValue())
    }));

    let elevatorServiceInstance = Container.get("ElevatorService");
    const elevatorServiceSpy = sinon.spy(elevatorServiceInstance, "createElevator");

    const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

    // Act
    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ "id": "123","name": req.body.name}));
    sinon.assert.calledOnce(elevatorServiceSpy);
    //sinon.assert.calledTwice(elevatorServiceSpy);
    sinon.assert.calledWith(elevatorServiceSpy, sinon.match({name: req.body.name}));
  });


  it('elevatorController unit test using elevatorService mock', async function () {
    // Arrange
    let body = { "name":'elevator12' };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy()
    };
    let next: Partial<NextFunction> = () => {};

    let elevatorServiceInstance = Container.get("ElevatorService");
    const elevatorServiceMock = sinon.mock(elevatorServiceInstance, "createElevator")
    elevatorServiceMock.expects("createElevator")
      .once()
      .withArgs(sinon.match({name: req.body.name}))
      .returns(Result.ok<IElevatorDTO>( {"id":"123", "name": req.body.name} ));

    const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

    // Act
    await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    elevatorServiceMock.verify();
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ "id": "123","name": req.body.name}));
  });
  */

});


