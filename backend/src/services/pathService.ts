import { Inject, Service } from "typedi";
import * as fs from "fs";
import * as readline from "readline";
import * as util from "util";
import IPathService from "./IServices/IPathService";

import { Result } from "../core/logic/Result";
import { spawn } from "child_process";
import * as path from 'path';
import config from "../../config";
import IConnectionRepo from "./IRepos/IConnectionRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import IElevatorRepo from "./IRepos/IElevatorRepo";
@Service()


export default class PathService implements IPathService {

  constructor(
    @Inject(config.repos.connection.name) private connectionRepo: IConnectionRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo
  ) {
  }

  public async getPl(originB, destB, originF, destF, originX, originY, destX, destY): Promise<String> {
    const { spawn } = require('child_process');
    const path = require('path');
    let prologOutput = '';
    const prologFilePath = path.join(__dirname, '../services/algav/ProjetoAlgav.pl');
    console.log(prologFilePath);
    const prologWorkingDirectory = path.dirname(prologFilePath);

    const consultQuery = 'consult(\'ProjetoAlgav.pl\').';
    const aStarQuery = `aStar(cel(${originB},${originF},${originX},${destX}), cel(${destB},${destF},${originY},${destY}), Caminho, Custo).`;

    const prolog = spawn('swipl', ['-s', prologFilePath], { cwd: prologWorkingDirectory, stdio: 'pipe' });


    /// Handle errors during consult
    prolog.stderr.once('data', (data) => {
      console.error(`Prolog Error (Consult): ${data}`);
    });

// Handle the consult query
    prolog.stdout.once('data', (data) => {
      console.log(`Prolog Output (Consult): ${data}`);
      // Write the aStar query to the Prolog process's stdin after consult is complete
      prolog.stdin.write(`${aStarQuery}\n`);

      setTimeout(() => {
        prolog.stdin.end();
      }, 5000);
    });

// Handle errors during aStar
    prolog.stderr.on('data', (data) => {
      console.error(`Prolog Error (aStar): ${data}`);
    });

// Handle the aStar query result
    prolog.stdout.on('data', (data) => {
      console.log(`Prolog Output (aStar): ${data}`);
      prologOutput += data;
    });

// Write the consult query to the Prolog process's stdin
    prolog.stdin.write(`${consultQuery}\n`);

    // Return the prologOutput
    return new Promise((resolve, reject) => {
      prolog.on('close', (code) => {
        console.log(`Prolog process exited with code ${code}`);
        console.log(`Prolog Output: ${prologOutput}`);
        resolve(prologOutput);
      });
    });
  }

  public async createPl(): Promise<void> {

    const buildings = await this.buildingRepo.getBuildings();

    const filePath = 'output.pl';

    for (let i = 0; i < buildings.length; i++) {
      const building = buildings.at(i);
      const Floors = building.floors;
      const buildingSizeX = building.dimX;
      const buildingSizeY = building.dimY;
      for (let j = 0; j < Floors.length; j++) {
        const floor = Floors.at(j);
        const Rooms = floor.rooms;
        const Connections = floor.connections;
        const Elevators = floor.elevators;
        for (let l = 0; l < buildingSizeX; l++) {
          fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + l + "," + 0 + "," + "1).\n");
          fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + l + "," + buildingSizeY + "," + "1).\n");
        }
        for (let m = 0; m < buildingSizeY; m++) {
          fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + 0 + "," + m + "," + "1).\n");
          fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + buildingSizeX + "," + m + "," + "1).\n");
        }
        for (let k = 0; k < Rooms.length; k++) {
          const room = Rooms.at(k);
          const x = room.destinationCoordinateX;
          const y = room.destinationCoordinateY;
          const x1 = room.originCoordinateX
          const y1 = room.originCoordinateY;
          const doorX = room.door.doorX;
          const doorY = room.door.doorY;

          // set north and south walls to 1
          for (let n = Math.min(x, x1); n <= Math.max(x, x1); n++) {
            if (n === doorX && y === doorY) {
              fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y + "," + "0).\n");
            } else if (n === doorX && y1 === doorY) {
              fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y1 + "," + "0).\n");
            } else {
              fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y + "," + "1).\n");
              fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y1 + "," + "1).\n");
            }
          }

          // set east and west walls to 1
          for (let p = Math.min(y, y1); p <= Math.max(y, y1); p++) {
            if (p === doorX && x === doorX) {
              fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x + "," + p + "," + "0).\n");
            } else if (p === doorX && x1 === doorX) {
              fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x1 + "," + p + "," + "0).\n");
            } else {
              fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x + "," + p + "," + "1).\n");
              fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x1 + "," + p + "," + "1).\n");
            }
          }

          // set inside of the room to 0
          for (let n = Math.min(x, x1) + 1; n < Math.max(x, x1); n++) {
            for (let p = Math.min(y, y1) + 1; p < Math.max(y, y1); p++) {
              fs.appendFileSync(filePath,"m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + p + "," + "0).\n");
            }
          }

          //set the rest of the building to 0 if not 1
          // to-do

        }
        for (let k = 0; k < Connections.length; k++) {
          const connection = Connections.at(k);
          const buildingFrom = connection.buildingfromId;
          const buildingTo = connection.buildingtoId;
          const floorFrom = connection.floorfromId;
          const floorTo = connection.floortoId;
          const x = connection.locationX;
          const y = connection.locationY;
          const x1 = connection.locationToX;
          const y1 = connection.locationToY;

          fs.appendFileSync(filePath,"ligacao_edificio(cel(" + buildingFrom + "," + floorFrom + "," + x + "," + y + "), cel(" + buildingTo + "," + floorTo + "," + x1 + "," + y1 + ")).")

        }
        /*
        PRECISA DE REVISÃO porque não guardamos a localização dos elevadores no piso adjacente
        for(let k = 0; k < Elevators.length; k++) {
          const elevator = Elevators.at(k);
          const x = elevator.locationX;
          const y = elevator.locationY;
          console.log("ligacao_piso(" + building.buildingId.buildingId +" cel(c, 1, 10, 2), cel(c, 2, 11, 2)");
        }
        */
      }
    }
  }
}