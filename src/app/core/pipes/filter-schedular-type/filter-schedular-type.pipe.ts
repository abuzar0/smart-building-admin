import { Pipe, PipeTransform } from '@angular/core';
import { ISchedularList } from '../../interfaces/ISchedular';

@Pipe({
  name: 'filterSchedularType',
  standalone: true
})
export class FilterSchedularTypePipe implements PipeTransform {

  transform(list: ISchedularList[], type: string): any[] {
        if (!list || !type || type.toLowerCase() === 'all') {
          return list; // Return all floors if "All" is selected
        }
        
        return list.filter(d => d.frequency.toLowerCase() === type.toLowerCase());
      }

}
