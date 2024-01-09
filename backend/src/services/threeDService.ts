import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import { promises as fs } from 'fs';
import IBuildingRepo from "./IRepos/IBuildingRepo";
import IFloorRepo from "./IRepos/IFloorRepo";
import IFloorDTO from "../dto/IFloorDTO";
import { FloorMap } from "../mappers/FloorMap";
import { Floor } from "../domain/Floor/floor";
import IThreeDService from "./IServices/IThreeDService";
import { Building } from "../domain/Building/building";
import roomRoute from "../api/routes/roomRoute";
import IRoomRepo from "./IRepos/IRoomRepo";
import IRoomDTO from "../dto/IRoomDTO";
import { Room } from "../domain/Room/room";
import { Elevator } from "../domain/Elevator/elevator";
import { writeFileSync } from 'fs';

@Service()
export default class ThreeDService implements IThreeDService {

    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo;
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo;
    @Inject(config.repos.room.name) private roomRepo: IRoomRepo;

    public async getJson(): Promise<Result<any>> {
        try {
            const jsonPath = "mazes/maze.json"
            const data = await fs.readFile(jsonPath, 'utf-8');
            const jsonResult = JSON.parse(data);
            return Result.ok<any>(jsonResult);
        } catch (e) {
            return Result.fail<any>(e);
        }
    }

    public async postJson(floorId: string): Promise<Result<any>> {
        try {
            const jsonPath = "mazes/maze.json"

            this.getFloor(floorId).then(async (floorResult) => {
                  if (floorResult.isFailure) {
                      return Result.fail<any>("Floor not found");
                  } else {
                      const floorDTO = floorResult.getValue();
                      const buildingId = floorDTO.buildingId;

                      const building =await this.buildingRepo.findByBuildingId(buildingId);

                      if (building === null) {
                          return Result.fail<any>("Building not found");
                      }

                      const floor = FloorMap.toDomain(floorDTO);

                        this.getRooms(floorId).then(async (roomsResult) => {
                              if (roomsResult.isFailure) {
                                  return Result.fail<any>("Rooms not found");
                              } else {
                                  const rooms = roomsResult.getValue();
                                  const doorMap = this.returnDoorMapJsonFromRooms(rooms);


                                  const elevators = floor.elevators;
                                  const elevatorMap = this.returnElevatorMapJsonFromElevators(elevators);



                                  const connections = floor.connections;
                                  const connectionMap = this.returnConnectionMapJsonFromConnections(connections);

                                  //const json = this.toJsonObject(building, floor);

                                  const json = this.toJsonObjectTest(building, floor, doorMap, elevatorMap, connectionMap);
                                  //const jsonTest = this.toJsonObjectTest(building, floor, doorMap, elevatorMap, connectionMap);

                                  // Use JSON.stringify with a space parameter of 4 to format the JSON
                                  const formattedJson = JSON.stringify(json, );
                                  //const formattedJsonTest = JSON.stringify(jsonTest, null, 4);
                                  const finalJson = this.formatJson(formattedJson);

                                  fs.writeFile(jsonPath, finalJson);
                                  //fs.writeFile("mazes/mazeTest.json", formattedJsonTest);
                                  return Result.ok<any>(json);
                              }
                          }
                        );

                  }
              }
            );
        } catch (e) {
            console.log(e);
            return Result.fail<any>(e);
        }
    }


    public async getFloor(floorId: string): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByFloorId(floorId);

            if (floor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            } else {
                const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
                return Result.ok<IFloorDTO>(floorDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async getRooms(floorId: string): Promise<Result<any>> {
        try {
            const rooms = await this.roomRepo.findRoomsByFloorId(floorId);

            if (rooms === null) {
                return Result.fail<any>("Rooms not found");
            } else {
                const roomsDTOResult = rooms;
                return Result.ok<any>(roomsDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public returnDoorMapJsonFromRooms(rooms: Room[]): number[][] {

        let doorMap: number[][] = [];
        console.log(rooms.length)
        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i];
            const doorX = room.door.doorX;
            const doorY = room.door.doorY;
            //const doorOrientation = room.doorOrientation;

            // Assuming doorOrientation is a valid number, you can adjust accordingly
            const doorInfo = [doorX, doorY, 1];

            doorMap.push(doorInfo);
        }

        return doorMap;

    }

    public returnElevatorMapJsonFromElevators(elevators: Elevator[]): number[][] {

        let elevatorMap: number[][] = [];
        console.log(elevators.length)
        for (let i = 0; i < elevators.length; i++) {
            const elevator = elevators[i];
            const elevatorX = elevator.locationX.locationX;
            const elevatorY = elevator.locationY.locationY;

            // Assuming doorOrientation is a valid number, you can adjust accordingly
            const elevatorInfo = [elevatorX, elevatorY, 1];

            elevatorMap.push(elevatorInfo);
        }

        return elevatorMap;
    }

    public returnConnectionMapJsonFromConnections(connections: any[]): number[][] {

          let connectionMap: number[][] = [];
          console.log(connections.length)
          for (let i = 0; i < connections.length; i++) {
              const connection = connections[i];
              const connectionX = connection.locationX;
              const connectionY = connection.locationY;

              // Assuming doorOrientation is a valid number, you can adjust accordingly
              const connectionInfo = [connectionX, connectionY, 1];

              connectionMap.push(connectionInfo);
          }

          return connectionMap;
    }



    toJsonObject(building: Building,floor: Floor, doormap: Number[][],elevatormap: Number[][],connectionmap: Number[][]): any {
        return {
            "groundTextureUrl": "./textures/ground.jpg",
            "wallTextureUrl": "./textures/wall2.jpg",
            "doorTextureUrl": "./textures/door.jpg",
            "elevatorTextureUrl": "./textures/elevator.jpg",
            "size": { "width": 10, "height": 10 },
            "map": [
                [3, 2, 2, 3, 2, 2, 3, 2, 2, 2, 1],
                [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                [3, 2, 0, 2, 2, 0, 2, 2, 2, 2, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 0]
            ],
            "doors": [
                [4,2,1],
                [1,3,2]
            ],
            "elevators": [
                [10,5,1],
                [5,0,2]

            ],
            "accesses": [
                [10,9,1],
                [4,5,1]
            ],
            "initialPosition": [7, 6],
            "initialDirection": 0.0,
            "exitLocation": [-0.5, 6]
        }
    }

    transpose(matrix) {
        return matrix[0].map((_, i) => matrix.map(row => row[i]));
    }
    toJsonObjectTest(building: Building,floor: Floor, doormap: Number[][],elevatormap: Number[][],connectionmap: Number[][]): any {


        // Check if there's no connection or elevator
        if (elevatormap.length == 0 && connectionmap.length == 0) {
            return {
                "groundTextureUrl": "./textures/floor2.jpg",
                "wallTextureUrl": "./textures/wall3.jpg",
                "doorTextureUrl": "./textures/door.jpg",
                "elevatorTextureUrl": "./textures/elevator.jpg",
                "size": { "width": floor.width, "height": floor.height },
                "map": floor.map,
                "doors": doormap,
                "elevators": elevatormap,
                "accesses": connectionmap,
                "initialPosition": [(floor.width/2)+1, (floor.height/2)-1],
                "initialDirection": 0.0,
                "exitLocation": [-0.5, 6]
            };
        }

        // Check if there's no connection
        if (connectionmap.length == 0 && elevatormap.length != 0) {
            // Get X and Y of the first elevator
            const elevatorX = elevatormap[0][0];
            const elevatorY = elevatormap[0][1];
            return {
                "groundTextureUrl": "./textures/floor2.jpg",
                "wallTextureUrl": "./textures/wall3.jpg",
                "doorTextureUrl": "./textures/door.jpg",
                "elevatorTextureUrl": "./textures/elevator.jpg",
                "size": { "width": floor.width, "height": floor.height },
                "map": floor.map,
                "doors": doormap,
                "elevators": elevatormap,
                "accesses": connectionmap,
                "initialPosition": [elevatorX, elevatorY],
                "initialDirection": 0.0,
                "exitLocation": [-0.5, 6]
            };
        }

        // Check if there's no elevator
        if (elevatormap.length == 0 && connectionmap.length != 0) {
            // Get X and Y of the first connection
            const connectionX = connectionmap[0][0];
            const connectionY = connectionmap[0][1];
            return {
                "groundTextureUrl": "./textures/floor2.jpg",
                "wallTextureUrl": "./textures/wall3.jpg",
                "doorTextureUrl": "./textures/door.jpg",
                "elevatorTextureUrl": "./textures/elevator.jpg",
                "size": { "width": floor.width, "height": floor.height },
                "map": floor.map,
                "doors": doormap,
                "elevators": elevatormap,
                "accesses": connectionmap,
                "initialPosition": [connectionX, connectionY],
                "initialDirection": 0.0,
                "exitLocation": [-0.5, 6]
            };
        }

        // If there's both connection and elevator

        // Get X and Y of the first connection
        const connectionX = connectionmap[0][0];
        const connectionY = connectionmap[0][1];
        // Get X and Y of the first elevator
        const elevatorX = elevatormap[0][0];
        const elevatorY = elevatormap[0][1];
        return {
            "groundTextureUrl": "./textures/floor2.jpg",
            "wallTextureUrl": "./textures/wall3.jpg",
            "doorTextureUrl": "./textures/door.jpg",
            "elevatorTextureUrl": "./textures/elevator.jpg",
            "size": { "width": floor.width, "height": floor.height },
            "map": floor.map,
            "doors": doormap,
            "elevators": elevatormap,
            "accesses": connectionmap,
            "initialPosition": [elevatorX, elevatorY],
            "initialDirection": 0.0,
            "exitLocation": [-0.5, 6]
        }

        //let transposedMap = this.transpose(floor.map);
        /*return {
            "groundTextureUrl": "./textures/floor2.jpg",
            "wallTextureUrl": "./textures/wall3.jpg",
            "doorTextureUrl": "./textures/door.jpg",
            "elevatorTextureUrl": "./textures/elevator.jpg",
            "size": { "width": floor.width, "height": floor.height },
            "map": floor.map,
            "doors": doormap,
            "elevators": elevatormap,
            "accesses": connectionmap,
            "initialPosition": [(floor.width/2)+1, (floor.height/2)-1],
            "initialDirection": 0.0,
            "exitLocation": [-0.5, 6]
        };*/
    }

    formatJson(json: string): string {
        let counter = 0;
        let inArray = false;
        let formattedJson = '';
        let firstBracketFound = false;

        for (let i = 0; i < json.length; i++) {
            if (json[i] === '[' && !firstBracketFound) {
                formattedJson += '[\n';
                firstBracketFound = true;
            } else {
                if (json[i] === ']') {
                    formattedJson += ']\n';
                } else {
                    formattedJson += json[i];
                }
            }
        }

        return formattedJson;
    }
}
