import { Pipe, PipeTransform } from '@angular/core';
import { IRoomList } from '../../interfaces/IRoomType';

@Pipe({
  name: 'filterRoomType',
  standalone: true
})
export class FilterRoomTypePipe implements PipeTransform {

  transform(rooms: IRoomList[], roomType: string): any[] {
    if (!rooms || !roomType || roomType.toLowerCase() === 'all') {
      return rooms; // Return all rooms if "All" is selected
    }

    return rooms.filter(room => room.room_type.toLowerCase() == roomType.toLowerCase());
  }

}
