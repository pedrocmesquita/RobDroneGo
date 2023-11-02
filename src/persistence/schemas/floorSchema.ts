import { IFloorPersistence } from "../../dataschema/IFloorPersistence"
import { Schema, model } from 'mongoose';

const FloorSchema = new Schema({
    floorId: {
        type: String,
        unique: true,
    },
    buildingId: {
        type: String,
        index: true,
    },
    floorNumber: {
        type: Number,
        required: [true, 'Please enter floor number'],
        index: true,
    },
    floorDescription: {
        type: String,
        index: true,
    },
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
});

export default model<IFloorPersistence & Document>('Floor', FloorSchema);