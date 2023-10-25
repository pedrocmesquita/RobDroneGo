import { IBuildingPersistence } from "../../dataschema/IBuildingPersistence";
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema({
    buildingId: String,
    buildingName: String,
    buildingNumberOfFloors: Number,
    floors: [{
        floorId: String,
        buildingId: String,
        floorNumber: Number
    }]
});

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);