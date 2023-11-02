import mongoose from 'mongoose';
import {IRobotPersistence} from "../../dataschema/IRobotPersistence";

const robotSchema = new mongoose.Schema(
    {
        idRobot: {
            type: String,
            unique: true,
        },

        robotName: {
            type: String,
            required: [true, 'Please enter robot name'],
            index: true,
            unique: true

        },

        typeOfRobot: {
            type: String,
            required: [true, 'Please enter type of robot'],
            index: true,
        },

        serialNumber: {
            type: String,
            required: [true, 'Please enter serial number'],
            index: true,
            unique: true
        },

        description: {
            type: String,
            required: [true, 'Please enter description'],
            index: true,
        },

        active: {
            type: Boolean,
            required: [true, 'Please enter active'],
            index: true,
        }

    },
    { timestamps: true },
);
export default mongoose.model<IRobotPersistence & mongoose.Document>('Robots', robotSchema);

