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
    floors: [{
        floorId: String,
        buildingId: String,
        floorNumber: Number,
        floorDescription: String
    }]
});

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);