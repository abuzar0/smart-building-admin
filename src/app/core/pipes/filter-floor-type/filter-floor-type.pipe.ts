import { Pipe, PipeTransform } from '@angular/core';
import { IFloorList } from '../../interfaces/IFloorType';

@Pipe({
  name: 'filterFloorType',
  standalone: true
})
export class FilterFloorTypePipe implements PipeTransform {

  transform(floors: IFloorList[], floorType: string): any[] {
    if (!floors || !floorType || floorType.toLowerCase() === 'all') {
      return floors; // Return all floors if "All" is selected
    }
    
    return floors.filter(floor => floor.floor_type.toLowerCase() === floorType.toLowerCase());
  }

}
