import { IBuildingPersistence } from "../../dataschema/IBuildingPersistence";
import mongoose from 'mongoose';

const ElevatorSchema = new mongoose.Schema({
  buildingId: {
    type: String,
    unique: true,
  },
  elevatorId: {
    type: String,
    unique: true,
  },
  elevatorBrand: {
    type: String,
    index: true,
  },
  elevatorModel: {
    type: String,
    index: true,
  },
  elevatorSerNum: {
    type: String,
    index: true,
  },
  elevatorDesc: {
    type: String,
    index: true,
  },
  currentFloor: {
    type: Number,
    required: [true, 'Please enter current elevator floor.'],
    index: true,
  },
  locationX: {
    type: Number,
    index: true,
  },
  locationY: {
    type: Number,
    index: true,
  }
});

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Elevator', ElevatorSchema);