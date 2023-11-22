import { IConnectionPersistence } from "../../dataschema/IConnectionPersistence";
import mongoose from 'mongoose';

const ConnectionSchema = new mongoose.Schema({
  connectionId: {
    type: String,
    required: true,
    unique: true
  },
  buildingfromId: {
    type: String,
    required: true
  },
  buildingtoId: {
    type: String,
    required: true
  },
  floorfromId: {
    type: String,
    required: true
  },
  floortoId: {
    type: String,
    required: true
  },
  locationX: {
    type: Number,
    required: true
  },
  locationY: {
    type: Number,
    required: true
  },
  locationToX: {
    type: Number,
    required: true
  },
  locationToY: {
    type: Number,
    required: true
  }
});

export default mongoose.model<IConnectionPersistence & mongoose.Document>('Connection', ConnectionSchema);