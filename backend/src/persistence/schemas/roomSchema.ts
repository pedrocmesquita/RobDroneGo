import { IRoomPersistence } from "../../dataschema/IRoomPersistence"
import { Schema, model } from 'mongoose';

const RoomSchema = new Schema({
  roomId: {
    type: String,
    unique: true,
  },
  floorId: {
    type: String,
    index: true,
  },
  roomName: {
    type: String,
    index: true,
  },
  roomDescription: {
    type: String,
    index: true,
  },
  roomCategory: {
    type: String,
    index: true,
  },
  doorX: {
    type: Number,
    index: true,
  },
  doorY: {
    type: Number,
    index: true,
  },
  originCoordinateX: {
    type: Number,
    index: true,
  },
  originCoordinateY: {
    type: Number,
    index: true,
  },
  destinationCoordinateX: {
    type: Number,
    index: true,
  },
  destinationCoordinateY: {
    type: Number,
    index: true,
  },
});

export default model<IRoomPersistence & Document>('Room', RoomSchema);