import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const buildingSchema = {
    // compare with the approach followed in repos and services
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const floorSchema = {
    // compare with the approach followed in repos and services
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };

  const elevatorSchema = {
    // compare with the approach followed in repos and services
    name: 'elevatorSchema',
    schema: '../persistence/schemas/elevatorSchema',
  }

  const connectionSchema = {
    // compare with the approach followed in repos and services
    name: 'connectionSchema',
    schema: '../persistence/schemas/connectionSchema',
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  }

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  }

  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  }

  const connectionController = {
    name: config.controllers.connection.name,
    path: config.controllers.connection.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  }

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  }

  const elevatorRepo = {
    name: config.repos.elevator.name,
    path: config.repos.elevator.path
  }

  const connectionRepo = {
    name: config.repos.connection.name,
    path: config.repos.connection.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  }

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  }

  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path
  }

  const connectionService = {
    name: config.services.connection.name,
    path: config.services.connection.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      buildingSchema,
      floorSchema,
      elevatorSchema,
      connectionSchema
    ],
    controllers: [
      roleController,
      buildingController,
      floorController,
      elevatorController,
      connectionController
    ],
    repos: [
      roleRepo,
      userRepo,
      buildingRepo,
      floorRepo,
      elevatorRepo,
      connectionRepo
    ],
    services: [
      roleService,
      buildingService,
      floorService,
      elevatorService,
      connectionService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
