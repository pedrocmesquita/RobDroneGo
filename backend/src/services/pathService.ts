import { Service } from "typedi";
import * as fs from "fs";
import * as readline from "readline";
import * as util from "util";
import IPathService from "./IServices/IPathService";

import { Result } from "../core/logic/Result";
import { spawn } from "child_process";

@Service()

export default class PathService implements IPathService{
  getPl(originB,destB,originF,destF,originX,originY,destX,destY): Promise<Result<any>> {
    console.log(originB,destB,originF,destF,originX,originY,destX,destY);
    console.log("Estou aqui");
    return new Promise<Result<any>>((resolve, reject) => {
      const prolog = spawn('swipl', ['-s', '../docs/SprintB/ProjetoAlgav.pl']);

      let result = '';
      let error = '';

      prolog.stdout.on('data', (data) => {
        result += data.toString();
      });

      prolog.stderr.on('data', (data) => {
        error += data.toString();
      });

      prolog.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Prolog process exited with code ${code}: ${error}`));
        } else {
          resolve(new Result<any>(true, result));
        }
      });

      prolog.stdin.write(`consult('ProjetoAlgav').\n`);
      prolog.stdin.write(`aStar(cel(${originB},${originF},${originX},${originY}),cel(${destB},${destF},${destX},${destY}),Caminho,Custo).\n`);
      prolog.stdin.end();

    });
  }




}