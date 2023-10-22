import { Mapper } from "../core/infra/Mapper";
import { Building } from "../domain/Building/building";
import IBuildingDTO from "../dto/IBuildingDTO";


export class BuildingMap implements Mapper<Building> {
    public static toDTO (building: Building): any {
        return {
            buildingId: building.buildingId,
        } as IBuildingDTO;
    }

    public static toDomain (raw: any): Building {
        const buildingOrError = Building.create({
            buildingId: raw.buildingId,
        });

        buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

        return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
    }

    public static toPersistence (building: Building): any {
        return {
            buildingId: building.buildingId
        };
    }
}
