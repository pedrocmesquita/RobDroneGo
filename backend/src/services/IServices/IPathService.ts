import { Result } from "../../core/logic/Result";

export default interface IPathService {
  getPl(originB,destB,originF,destF,originX,originY,destX,destY): Promise<String>;
  createPl(): Promise<void>;
}
