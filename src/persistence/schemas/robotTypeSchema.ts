
import mongoose from 'mongoose';
import { Task } from '../../domain/RobotType/task';
import { List } from 'immutable';

const robot = new mongoose.Schema(
  {
    typeId: { 
      type: String,
      unique: true
    },

    brand: {
      type: String,
      required: [true, 'Please enter brand'],
      index: true,
    },

    model: {
      type: String,
      required: [true, 'Please entermodel'],
      index: true,
    },

    tasks: {
      type: List<Task>,
      lowercase: true,  
      unique: true,
      index: true,
    },

  },
  { timestamps: true },
);

