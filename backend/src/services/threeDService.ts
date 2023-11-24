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

@Service()
export default class ThreeDService implements IThreeDService {

    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo;
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo;

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

                      console.log("floor.map:");
                      console.log(floor.map);

                      const json = this.toJsonObject(building, floor);
                      const jsonTest = this.toJsonObjectTest(building, floor);

                      // Use JSON.stringify with a space parameter of 4 to format the JSON
                      const formattedJson = JSON.stringify(json, null, 4);
                      const formattedJsonTest = JSON.stringify(jsonTest, null, 4);

                      fs.writeFile(jsonPath, formattedJson);
                      fs.writeFile("mazes/mazeTest.json", formattedJsonTest);
                      return Result.ok<any>(json);
                  }
              }
            );
        } catch (e) {
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



    toJsonObject(building: Building,floor: Floor): any {
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
                [4, 2, 1],
                [1, 3, 2]
            ],
            "elevators": [
                [10, 5, 1],
                [5, 0, 2]

            ],
            "accesses": [
                [10, 9, 1],
                [4, 5, 1]
            ],
            "initialPosition": [7, 6],
            "initialDirection": 0.0,
            "exitLocation": [-0.5, 6]
        };
    }

    toJsonObjectTest(building: Building,floor: Floor): any {
        return {
            "groundTextureUrl": "./textures/ground.jpg",
            "wallTextureUrl": "./textures/wall2.jpg",
            "doorTextureUrl": "./textures/door.jpg",
            "elevatorTextureUrl": "./textures/elevator.jpg",
            "size": { "width": 10, "height": 10 },
            "map": floor.map,
            "doors": [
                [4, 2, 1],
                [1, 3, 2]
            ],
            "elevators": [
                [10, 5, 1],
                [5, 0, 2]

            ],
            "accesses": [
                [10, 9, 1],
                [4, 5, 1]
            ],
            "initialPosition": [7, 6],
            "initialDirection": 0.0,
            "exitLocation": [-0.5, 6]
        };
    }
}
