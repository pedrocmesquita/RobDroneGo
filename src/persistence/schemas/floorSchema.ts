import { IFloorPersistence } from "../../dataschema/IFloorPersistence"
import { Schema, model } from 'mongoose';

const FloorSchema = new Schema({
    floorId: String,
    buildingId: String,
    floorNumber: Number
});

export default model<IFloorPersistence & Document>('Floor', FloorSchema);