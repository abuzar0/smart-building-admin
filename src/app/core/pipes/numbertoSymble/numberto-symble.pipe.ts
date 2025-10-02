import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numbertoSymble',
  standalone: true
})
export class NumbertoSymblePipe implements PipeTransform {

  transform(value: number | string): string {
    const num = parseFloat(value as string);
    if (isNaN(num)) return value as string;

    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toFixed(1);
  }

}
