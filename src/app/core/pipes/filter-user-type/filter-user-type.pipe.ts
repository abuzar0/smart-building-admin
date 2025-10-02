import { Pipe, PipeTransform } from '@angular/core';
import { IUserList } from '../../interfaces/IUser';

@Pipe({
  name: 'filterUserType',
  standalone: true
})
export class FilterUserTypePipe implements PipeTransform {

   transform(users: IUserList[], userType: string): any[] {
      if (!users || !userType || userType.toLowerCase() === 'all') {
        return users; // Return all users if "All" is selected
      }
  
      return users.filter(user => user.role.type.toLowerCase() == userType.toLowerCase());
    }

}
