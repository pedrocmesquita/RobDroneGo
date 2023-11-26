import { Service } from "typedi";
import * as fs from "fs";
import * as readline from "readline";
import * as util from "util";
import IPathService from "./IServices/IPathService";

import { Result } from "../core/logic/Result";
import { spawn } from "child_process";
import * as path from 'path';
@Service()


export default class PathService implements IPathService{


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

  }