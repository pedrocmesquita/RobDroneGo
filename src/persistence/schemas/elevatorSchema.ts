import { IElevatorPersistence } from "../../dataschema/IElevatorPersistence"
import { Schema, model } from 'mongoose';

const ElevatorSchema = new Schema({
  buildingId: String,
  elevatorId: String,
  currentFloor: Number,
  locationX: Number,
  locationY: Number
});

export default model<IElevatorPersistence & Document>('Elevator', ElevatorSchema);