import mongoose from 'mongoose';
import {IRobotPersistence} from "../../dataschema/IRobotTypePersistence";

const robotTypeSchema = new mongoose.Schema(
  {
    typeId: { 
      type: String,
      unique: true
    },

    brand: {
      type: String,
      required: [true, 'Please enter brand'],
      index: true,
    },

    model: {
      type: String,
      required: [true, 'Please enter model'],
      index: true,
    },

    tasks: {
      type: [String],
      required: [true, 'Please enter tasks'],
    },

  },
  { timestamps: true },
);
export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', robotTypeSchema);

