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
    width: {
        type: Number,
        index: true,
    },
    height: {
        type: Number,
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
        originCoordinateX: Number,
        originCoordinateY: Number,
        destinationCoordinateX: Number,
        destinationCoordinateY: Number,
    }],
    elevators: [{
        elevatorId: String,
        floorsAttended: [String],
        elevatorBrand: String,
        elevatorModel: String,
        elevatorSerNum: String,
        elevatorDesc: String,
        currentFloor: Number,
        locationX: Number,
        locationY: Number,
    }],
});

export default model<IFloorPersistence & Document>('Floor', FloorSchema);