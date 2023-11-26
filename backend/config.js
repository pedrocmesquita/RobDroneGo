import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000, 

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb+srv://1211171:Wx99RL3EmpbVBFe6@cluster0.v4ikssj.mongodb.net/?retryWrites=true&w=majority",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    building: {
      name: "BuildingController",
      path: "../controllers/buildingController"
    },
    floor: {
      name: "FloorController",
      path: "../controllers/floorController"
    },
    elevator: {
      name: "ElevatorController",
      path: "../controllers/elevatorController"
    },
    connection: {
      name: "ConnectionController",
      path: "../controllers/connectionController"
    },
    robotType: {
      name: "robotTypeController",
      path: "../controllers/robotTypeController"
    },
    robot: {
      name: "robotController",
      path: "../controllers/robotController"
    },
    room: {
      name: "roomController",
      path: "../controllers/roomController"
    },
    log: {
      name: "logController",
      path: "../controllers/logController"
    },
    threeD: {
      name: "threeDController",
      path: "../controllers/threeDController"
    },
    path: {
      name: "pathController",
      path: "../controllers/pathController"
    },
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    building: {
      name: "BuildingRepo",
      path: "../repos/buildingRepo"
    },
    floor: {
      name: "FloorRepo",
      path: "../repos/floorRepo"
    },
    elevator: {
      name: "ElevatorRepo",
      path: "../repos/elevatorRepo"
    },
    connection: {
      name: "ConnectionRepo",
      path: "../repos/connectionRepo"
    },
    robotType: {
      name: "robotTypeRepo",
      path: "../repos/robotTypeRepo"
    },
    robot: {
      name: "robotRepo",
      path: "../repos/robotRepo"
    },
    room: {
      name: "roomRepo",
      path: "../repos/roomRepo"
    },
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    building: {
      name: "BuildingService",
      path: "../services/buildingService"
    },
    floor: {
      name: "FloorService",
      path: "../services/floorService"
    },
    elevator: {
      name: "ElevatorService",
      path: "../services/elevatorService"
    },
    connection: {
      name: "ConnectionService",
      path: "../services/connectionService"
    },
    robotType: {
      name: "robotTypeService",
      path: "../services/robotTypeService"
    },
    robot: {
      name: "robotService",
      path: "../services/robotService"
    },
    room: {
      name: "roomService",
      path: "../services/roomService"
    },
    log: {
      name: "logService",
      path: "../services/logService"
    },
    threeD: {
      name: "threeDService",
      path: "../services/threeDService"
    },
    path: {
      name: "pathService",
      path: "../services/pathService"
    },
  },
};
