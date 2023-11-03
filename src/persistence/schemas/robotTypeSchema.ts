import mongoose from 'mongoose';
import {IRobotTypePersistence} from "../../dataschema/IRobotTypePersistence";

const robotTypeSchema = new mongoose.Schema(
  {
    typeId: { 
      type: String,
        required: [true, 'Please enter type id'],    },

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
export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', robotTypeSchema);

