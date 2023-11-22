import { Response, Request, NextFunction } from "express";
import {Container, Inject, Service} from 'typedi';
import IRoomController from './IControllers/IRoomController';
import IRoomService from '../services/IServices/IRoomService';
import config from '../../config';
import IRoomDTO from '../dto/IRoomDTO';
import {RoomMap} from '../mappers/RoomMap';
import IRoomRepo from '../services/IRepos/IRoomRepo';
import {Room} from '../domain/Room/room';
import { Building } from '../domain/Building/building';
import { Result } from "../core/logic/Result";

@Service()
export default class RoomController implements IRoomController{

  constructor(
    @Inject(config.services.room.name) private roomServiceInstance: IRoomService
  ) {
  }

  public async getRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const room = await this.roomServiceInstance.getRoom(req.params.id as string);

      if (room.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json(room.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = (await this.roomServiceInstance.createRoom(
        req.body as IRoomDTO,
      )) as Result<IRoomDTO>;

      if (roomOrError.isFailure) {
        return res.status(404).send();
      }

      return res.status(201).json(roomOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {

      req.body.buildingId = req.body.roomId.split("-")[0];

      const oldRoomId = req.body.roomId;

      // RoomId is the concatenation of buildingId and roomNumber
      req.body.roomId = req.body.buildingId+"-"+req.body.roomNumber;

      // const roomOrError = await this.roomServiceInstance.updateRoom(req.body as IRoomDTO, oldRoomId) as Result<IRoomDTO>;

      //if (roomOrError.isFailure) {
        //return res.status(404).send();
      //}

      //return res.status(200).json(roomOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async deleteRoom({params: {roomId}}: Request, res: Response, next: NextFunction) {
    try {
      const roomOrError = await this.roomServiceInstance.deleteRoom(roomId as string);

      if (roomOrError.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json(roomOrError.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async getRooms(req: Request, res: Response, next:NextFunction) {
    try {
      const rooms = await this.roomServiceInstance.getRooms();

      if (rooms.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json(rooms.getValue());
    } catch (e) {
      return next(e);
    }
  }

}