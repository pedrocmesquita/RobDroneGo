import { IFloorPersistence } from "../../dataschema/IFloorPersistence"
import { Schema, model } from 'mongoose';

const FloorSchema = new Schema({

    buildingId: {
        type: String,
        index: true,
    },
    floorNumber: {
        type: Number,
        required: [true, 'Please enter floor number'],
        index: true,
    },
    floorId: {
        type: String,
        unique: true,
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
    rooms: [{
        roomId: String,
        floorId: String,
        roomName: String,
        roomDescription: String,
        roomCategory: String,
        doorX: Number,
        doorY: Number,
    }],
});

export default model<IFloorPersistence & Document>('Floor', FloorSchema);