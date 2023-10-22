import { IBuildingPersistence } from "../../dataschema/IBuildingPersistence";
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema({
    buildingId: String,
});

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);