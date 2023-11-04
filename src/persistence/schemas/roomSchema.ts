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
    required: [true, 'Please enter room name'],
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
});

export default model<IRoomPersistence & Document>('Room', RoomSchema);