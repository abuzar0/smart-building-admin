import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberformat',
  standalone: true
})
export class NumberformatPipe implements PipeTransform {

  transform(value: number | string): string {
    if (!value) {
      return '00';
    }
    const num = typeof value === 'string' ? parseInt(value, 10) : value;
    return num < 10 ? `0${num}` : `${num}`;
  }

}
