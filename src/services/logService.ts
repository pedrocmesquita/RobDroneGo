import { Service } from "typedi";
import ILogService from "./IServices/ILogService";
import * as fs from "fs";
import * as readline from "readline";
import * as util from "util";

@Service()

export default class LogService implements ILogService {


  constructor() {
  }

  public async getAuth(): Promise<String[]> {
    const authLogPath = "var/log/auth.log";
    const emailCounts: { [email: string]: number } = {};

    const readInterface = readline.createInterface({
      input: fs.createReadStream(authLogPath)
    });

    return new Promise((resolve, reject) => {
      readInterface.on('line', function(line) {
        if (!emailCounts[line]) {
          emailCounts[line] = 0;
        }
        emailCounts[line]++;
      });

      readInterface.on('close', function() {
        const emails = Object.keys(emailCounts).filter(email => emailCounts[email] >= 3);
        resolve(emails);
      });

      readInterface.on('error', function(err) {
        reject(err);
      });
    });
  }

  public async postAuth(email: string): Promise<boolean> {
    const authLogPath = "var/log/auth.log";
    const appendFile = util.promisify(fs.appendFile);
    const readFile = util.promisify(fs.readFile);
    const stat = util.promisify(fs.stat);

    try {
      // Check if the log file is empty
      const stats = await stat(authLogPath);
      const isNewLineNeeded = stats.size > 0;

      // Append the new email to the log file
      await appendFile(authLogPath, `${isNewLineNeeded ? '\n' : ''}${email}`);

      // Read the updated log file
      const logData = await readFile(authLogPath, 'utf-8');

      // Check if the log data contains the email
      return logData.includes(email);
    } catch (err) {
      console.error(`Error writing to or reading from log file: ${err}`);
      throw err;
    }
  }
}