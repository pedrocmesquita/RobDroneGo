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

    // Run createPl method to create the output.pl file
    //await this.createPl();


    const { spawn } = require('child_process');
    const path = require('path');
    let prologOutput = '';
    const prologFilePath = path.join(__dirname, '../services/algav/ProjetoAlgav.pl');
    console.log(prologFilePath);
    const prologWorkingDirectory = path.dirname(prologFilePath);

    const consultQuery = 'consult(\'ProjetoAlgav.pl\').';
    const aStarQuery = `aStar(cel(${originB},${originF},${originX},${destX}), cel(${destB},${destF},${originY},${destY}), Caminho, Custo).`;
    console.log(aStarQuery);

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

    const filePath = path.join(__dirname, '../services/algav/output.pl');

    // first thing clear the file
    fs.writeFileSync(filePath, "");

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
          // Check if already exists a wall
          if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + l + "," + 0 + "," + "1).\n"))
          fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + l + "," + 0 + "," + "1).\n");
          // Check if already exists a wall
          if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + l + "," + buildingSizeY + "," + "1).\n"))
          fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + l + "," + buildingSizeY + "," + "1).\n");
        }
        for (let m = 0; m < buildingSizeY; m++) {
          // Check if already exists a wall
          if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + 0 + "," + m + "," + "1).\n"))
          fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + 0 + "," + m + "," + "1).\n");
          // Check if already exists a wall
          if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + buildingSizeX + "," + m + "," + "1).\n"))
          fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + buildingSizeX + "," + m + "," + "1).\n");
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
              // Check if already exists a wall
              if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y + "," + "1).\n"))
              fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y + "," + "0).\n");
            } else if (n === doorX && y1 === doorY) {
              // Check if already exists a wall
              if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y1 + "," + "1).\n"))
              fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y1 + "," + "0).\n");
            } else {
              // Check if already exists a wall
              if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y + "," + "1).\n"))
              fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y + "," + "1).\n");
              // Check if already exists a wall
              if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y1 + "," + "1).\n"))
              fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + y1 + "," + "1).\n");
            }
          }

          // set east and west walls to 1
          for (let p = Math.min(y, y1); p <= Math.max(y, y1); p++) {
            if (p === doorX && x === doorX) {
              // Check if already exists a wall
              if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x + "," + p + "," + "1).\n"))
              fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x + "," + p + "," + "0).\n");
            } else if (p === doorX && x1 === doorX) {
              // Check if already exists a wall
              if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x1 + "," + p + "," + "1).\n"))
              fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x1 + "," + p + "," + "0).\n");
            } else {
              // Check if already exists a wall
              if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x + "," + p + "," + "1).\n"))
              fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x + "," + p + "," + "1).\n");
              // Check if already exists a wall
              if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x1 + "," + p + "," + "1).\n"))
              fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + x1 + "," + p + "," + "1).\n");
            }
          }

          // set inside of the room to 0
          for (let n = Math.min(x, x1) + 1; n < Math.max(x, x1); n++) {
            for (let p = Math.min(y, y1) + 1; p < Math.max(y, y1); p++) {
              // Check if already exists a wall
              if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + p + "," + "1).\n"))
                // Check if its already 1
                if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + p + "," + "0).\n"))
                fs.appendFileSync(filePath, "m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + p + "," + "0).\n");
            }
          }

          //set the rest of the building to 0 if not 1
          for (let n = 0; n < buildingSizeX; n++) {
            for (let p = 0; p < buildingSizeY; p++) {
              // Check if the position already has a 1 (wall or room)
              const hasWallOrRoom = Rooms.some(room => {
                const x = room.destinationCoordinateX;
                const y = room.destinationCoordinateY;
                const x1 = room.originCoordinateX;
                const y1 = room.originCoordinateY;
                const doorX = room.door.doorX;
                const doorY = room.door.doorY;

                return (
                  (n >= Math.min(x, x1) && n <= Math.max(x, x1) && p >= Math.min(y, y1) && p <= Math.max(y, y1)) ||
                  (p === doorY && ((n === doorX && y === doorY) || (n === doorX && y1 === doorY)))
                );
              });

              // If the position doesn't have a wall or room, set it to 0
              if (!hasWallOrRoom) {
                // Check if already exists a wall
                if (!fs.readFileSync(filePath).includes("m(" + building.buildingId.buildingId + "," + floor.floorId + "," + n + "," + p + "," + "1).\n"))
                fs.appendFileSync(filePath, `m(${building.buildingId.buildingId},${floor.floorId},${n},${p},0).\n`);
              }
            }
          }
        }
      }
    }

    // Set the connections between floors
    for (let i = 0; i < buildings.length; i++) {
      const building = buildings.at(i);
      const Floors = building.floors;
      for (let j = 0; j < Floors.length; j++) {
        const floor = Floors.at(j);
        const Elevators = floor.elevators;
        for(let k = 0; k < Elevators.length; k++) {
          const elevator = Elevators.at(k);
          const floorsAttended = elevator.floorsAttended;
          const x = elevator.locationX.locationX;
          const y = elevator.locationY.locationY;
          for (let l = 0; l < floorsAttended.length; l++) {
            // The second floor is the one that is connected to the first floor
            const floorTo = floorsAttended.at(l);
            const floorFrom = floor.floorId;
            // Check if it was already wrote to the file
            if (!fs.readFileSync(filePath).includes("ligacao_piso(" + building.buildingId.buildingId + ", cel(" + building.buildingId.buildingId + "," + floorFrom + "," + x + "," + y + "), cel(" + building.buildingId.buildingId + "," + floorTo + "," + x + "," + y + ")).\n"))
              fs.appendFileSync(filePath,"ligacao_piso(" + building.buildingId.buildingId + ", cel(" + building.buildingId.buildingId + "," + floorFrom + "," + x + "," + y + "), cel(" + building.buildingId.buildingId + "," + floorTo + "," + x + "," + y + ")).\n");
          }
        }
      }
    }

    // Set the connections between buildings
    for (let i = 0; i < buildings.length; i++) {
      const building = buildings.at(i);
      const Floors = building.floors;
      for (let j = 0; j < Floors.length; j++) {
        const floor = Floors.at(j);
        const Connections = floor.connections;
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

          fs.appendFileSync(filePath,"ligacao_edificio(cel(" + buildingFrom + "," + floorFrom + "," + x + "," + y + "), cel(" + buildingTo + "," + floorTo + "," + x1 + "," + y1 + ")).\n")

        }
      }
    }



    fs.appendFileSync(filePath, ":- set_prolog_flag(answer_write_options,[max_depth(0)]).\n" +
      ":- set_prolog_flag(stack_limit,17_179_869_184). %next size stack 17_179_869_184\n" +
      "\n" +
      ":- dynamic ligacel/2.\n" +
      ":- dynamic ligacao_piso/3.\n" +
      ":- dynamic ligacao_edificio/2.\n" +
      "\n" +
      "% Função para criar os grafos de um piso específico\n" +
      "\n" +
      "cria_grafo(Edificio, Piso, _, 0) :- !.\n" +
      "cria_grafo(Edificio, Piso, Col, Lin) :-\n" +
      "    cria_grafo_lin(Edificio, Piso, Col, Lin),\n" +
      "    Lin1 is Lin - 1,\n" +
      "    cria_grafo(Edificio, Piso, Col, Lin1).\n" +
      "\n" +
      "cria_grafo_lin(_, _, 0, _) :- !.\n" +
      "cria_grafo_lin(Edificio, Piso, Col, Lin) :-\n" +
      "    m(Edificio, Piso, Col, Lin, 0), !,\n" +
      "    ColS is Col + 1, ColA is Col - 1, LinS is Lin + 1, LinA is Lin - 1,\n" +
      "    cria_ligacoes(Edificio, Piso, Col, Lin, ColS, ColA, LinS, LinA),\n" +
      "    Col1 is Col - 1,\n" +
      "    cria_grafo_lin(Edificio, Piso, Col1, Lin).\n" +
      "\n" +
      "cria_grafo_lin(Edificio, Piso, Col, Lin) :-\n" +
      "    Col1 is Col - 1,\n" +
      "    cria_grafo_lin(Edificio, Piso, Col1, Lin).\n" +
      "\n" +
      "% Função auxiliar para criar ligações entre células adjacentes\n" +
      "cria_ligacoes(Edificio, Piso, Col, Lin, ColS, ColA, LinS, LinA) :-\n" +
      "    ((m(Edificio, Piso, ColS, Lin, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColS, Lin))); true)),\n" +
      "    ((m(Edificio, Piso, ColA, Lin, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColA, Lin))); true)),\n" +
      "    ((m(Edificio, Piso, Col, LinS, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, Col, LinS))); true)),\n" +
      "    ((m(Edificio, Piso, Col, LinA, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, Col, LinA))); true)),\n" +
      "    % Ligações diagonais\n" +
      "    ((m(Edificio, Piso, ColS, LinS, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColS, LinS))); true)),\n" +
      "    ((m(Edificio, Piso, ColS, LinA, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColS, LinA))); true)),\n" +
      "    ((m(Edificio, Piso, ColA, LinS, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColA, LinS))); true)),\n" +
      "    ((m(Edificio, Piso, ColA, LinA, 0), assertz(ligacel(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColA, LinA))); true)).\n" +
      "\n" +
      "% Extensão do ligacel para lidar com ligações entre pisos e edifícios\n" +
      "ligacel(Cel1, Cel2) :-\n" +
      "    ligacel_piso(Cel1, Cel2);  % Verifica se existe ligação direta\n" +
      "    ligacel_piso(Cel2, Cel1);  % Verifica se a ligação é bidirecional\n" +
      "    ligacao_piso(_, Cel1, Cel2);  % Verifica ligações entre pisos\n" +
      "    ligacao_piso(_, Cel2, Cel1);  % Verifica se a ligação entre pisos é bidirecional\n" +
      "    ligacao_edificio(Cel1, Cel2);  % Verifica ligações entre edifícios\n" +
      "    ligacao_edificio(Cel2, Cel1).  % Verifica se a ligação entre edifícios é bidirecional\n" +
      "\n" +
      "ligacel_piso(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, Col, LinS)) :-\n" +
      "    m(Edificio, Piso, Col, Lin, 0),\n" +
      "    m(Edificio, Piso, Col, LinS, 0),\n" +
      "    LinS is Lin + 1.\n" +
      "\n" +
      "ligacel_piso(cel(Edificio, Piso, Col, Lin), cel(Edificio, Piso, ColS, Lin)) :-\n" +
      "    m(Edificio, Piso, Col, Lin, 0),\n" +
      "    m(Edificio, Piso, ColS, Lin, 0),\n" +
      "    ColS is Col + 1.\n");


    fs.appendFileSync(filePath,"% Predicado de inicialização\n" +
      ":- initialization(cria_grafos).\n" +
      "\n" +
      "cria_grafos :-\n");
      for (let i = 0; i < buildings.length; i++) {
        const building = buildings.at(i);
        const Floors = building.floors;
        for (let j = 0; j < Floors.length; j++) {
          const floor = Floors.at(j);
          // If last line
          if (i === buildings.length - 1 && j === Floors.length - 1) {
            fs.appendFileSync(filePath, "    cria_grafo(" + building.buildingId.buildingId + "," + floor.floorId + "," + floor.width + "," + floor.height + ").\n");
            break;
          }
          fs.appendFileSync(filePath, "    cria_grafo(" + building.buildingId.buildingId + "," + floor.floorId + "," + floor.width + "," + floor.height + "),\n");
        }
      }
      fs.appendFileSync(filePath,
      "\n" +
      "aStar(Orig, Dest, Cam, Custo):-\n" +
      "    aStar2(Dest, [(_, 0, [Orig])], [], Cam, Custo).\n" +
      "\n" +
      "aStar2(Dest, [(_, Custo, [Dest|T])|_], _, Cam, Custo):-\n" +
      "    reverse([Dest|T], Cam).\n" +
      "\n" +
      "aStar2(Dest, [(_, Ca, LA)|Outros], Visitados, Cam, Custo):-\n" +
      "    LA = [Act|_],\n" +
      "    findall((CEX, CaX, [X|LA]),\n" +
      "            (Dest \\== Act,\n" +
      "             ligacel(Act, X),\n" +
      "             \\+ member(X, Visitados),\n" +
      "             \\+ member(X, LA),\n" +
      "             CaX is Ca + 1,  % Cost from start to current node\n" +
      "             heuristic(X, Dest, EstX),  % node to goal estimation\n" +
      "             CEX is CaX + EstX),  % Total cost including heuristic\n" +
      "            Novos),\n" +
      "    append(Outros, Novos, Todos),\n" +
      "    append(Visitados, [Act], VisitadosAtualizados),\n" +
      "    sort(Todos, TodosOrd),\n" +
      "    aStar2(Dest, TodosOrd, VisitadosAtualizados, Cam, Custo).\n" +
      "\n" +
      "heuristic(cel(_, _, X1, Y1), cel(_, _, X2, Y2), Estimativa) :-\n" +
      "    Estimativa is abs(X2 - X1) + abs(Y2 - Y1).");
  }
}