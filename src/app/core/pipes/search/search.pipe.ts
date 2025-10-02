import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], searchText: string, type: string): any[] {
    if (!list || !searchText || !type) {
      return list;
    }

    searchText = searchText.toLowerCase();

    return list.filter(item => {
      switch (type) {
        case 'schedular':
          // Assuming threshold item has property 'name' or 'label'
          return item?.device_data[0].name?.toLowerCase().includes(searchText)

        case 'user':
          // Assuming threshold item has property 'name' or 'label'
          return item?.username?.toLowerCase().includes(searchText)

        case 'room':
          // Assuming room item has 'roomName' or 'roomNumber'
          return item.name?.toLowerCase().includes(searchText);

        case 'floor':
          // Assuming floor item has 'floorName' or 'floorNumber'
          return item.name?.toLowerCase().includes(searchText)

        case 'device':
          // Assuming floor item has 'floorName' or 'floorNumber'
          return item.name?.toLowerCase().includes(searchText)

        default:
          // Fallback: check all string properties if any contains the search text
          return Object.values(item).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(searchText));
      }
    });
  }

}
