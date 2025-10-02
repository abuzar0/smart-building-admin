import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithCommas',
  standalone: true
})
export class NumberWithCommasPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value == null) return '--';
    const num = Number(value);
    if (isNaN(num)) return value.toString();
    return num.toLocaleString('en-US');
  }

}
