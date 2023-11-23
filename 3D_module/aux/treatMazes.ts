import { Mazes } from "../services/mazes";

export class TreatMazes{

  mazes: any;
  constructor(mazes: Mazes) {
    this.mazes = mazes.getMazeData();
    console.log(this.mazes);
  }

  getMazeWithId(mazeId: string): any {
    return this.mazes.find(maze => maze._id == mazeId);
  }

  // Check if the maze isnt null
  isMazeNull(maze: any): boolean {
    return maze == null;
  }

  // Check if the maze is empty
  isMazeEmpty(maze: any): boolean {
    return maze.length == 0;
  }
}