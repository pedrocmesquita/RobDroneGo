import { IBuildingPersistence } from "../../dataschema/IBuildingPersistence";
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema({
    buildingId: {
        type: String,
        unique: true,
    },
    buildingName: {
        type: String,
        required: [true, 'Please enter building name'],
        index: true,
    },
    buildingDescription: {
        type: String,
        index: true,
    },
    buildingNumberOfFloors: {
        type: Number,
        required: [true, 'Please enter number of floors'],
        index: true,
    },
    dimX: {
        type: Number,
        required: [true, 'Please enter dimension X'],
        index: true,
    },
    dimY: {
        type: Number,
        required: [true, 'Please enter dimension Y'],
        index: true,
    },
    floors: [{
        floorId: String,
        buildingId: String,
        floorNumber: Number,
        floorDescription: String,
        connections: [{
            connectionId: String,
            buildingfromId: String,
            buildingtoId: String,
            floorfromId: String,
            floortoId: String,
            locationX: Number,
            locationY: Number,
            locationToX: Number,
            locationToY: Number,
        }],
    }]
});

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);