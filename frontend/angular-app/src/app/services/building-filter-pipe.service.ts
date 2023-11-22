import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buildingFilter'
})
export class BuildingFilterPipe implements PipeTransform {
  transform(floors: string[], buildingId: string): string[] {
    return floors.filter(floor => floor.split('-')[0] === buildingId);
  }
}
