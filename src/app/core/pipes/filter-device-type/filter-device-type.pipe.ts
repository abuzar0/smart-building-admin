import { Pipe, PipeTransform } from '@angular/core';
import { IDevice } from '../../interfaces/IDevices';

@Pipe({
  name: 'filterDeviceType',
  standalone: true
})
export class FilterDeviceTypePipe implements PipeTransform {

  transform(device: IDevice[], deviceType: string): any[] {
      if (!device || !deviceType || deviceType.toLowerCase() === 'all') {
        return device; // Return all floors if "All" is selected
      }
      
      return device.filter(d => d.deviceType.toLowerCase() === deviceType.toLowerCase());
    }

}
