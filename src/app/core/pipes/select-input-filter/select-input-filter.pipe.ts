import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectInputFilter',
  standalone: true
})
export class SelectInputFilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (args !== undefined && args !== '') {
      // console.log("if", args, "value", value);
      let temp = value;
      temp = temp.filter((item: any) => {
        if (typeof item === 'object') {
          return Object.values(item).some((value: any) =>
            typeof value === 'string' && value.toLowerCase().includes(String(args).toLowerCase())
          );
        } else {
          if (typeof item === 'string') {
            return item.toLowerCase().includes(String(args).toLowerCase());
          }
        }
        return false; // Return false if item doesn't match the search criteria
      });
      return temp;
    }
    return value;
  }

}
