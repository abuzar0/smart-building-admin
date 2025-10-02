import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'timeUnit',
  pure: false,
  standalone: true
})
export class TimeUnitPipe implements PipeTransform {

  constructor(private translate: TranslateService) { }

  transform(value: string | null): string {
    if (!value) return ''; // Safely handle null or empty input

    return value
      .replace('AM', this.translate.instant('alerts.detail.am'))
      .replace('PM', this.translate.instant('alerts.detail.pm'));
  }


}
