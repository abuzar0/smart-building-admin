import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure:false
})
export class TimeAgoPipe implements PipeTransform {

  constructor(private translate: TranslateService) { }

  transform(value: string): string {
    const date = new Date(value);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60)
      return this.translate.instant('time.seconds_ago', { value: diffInSeconds });

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60)
      return this.translate.instant('time.minutes_ago', { value: diffInMinutes });

    const diffInHours = Math.floor(diffInMinutes / 60);
    const remainingMinutes = diffInMinutes % 60;
    if (diffInHours < 24)
      return this.formatTime(diffInHours, 'hour', remainingMinutes, 'minute');

    const diffInDays = Math.floor(diffInHours / 24);
    const remainingHours = diffInHours % 24;
    if (diffInDays < 30)
      return this.formatTime(diffInDays, 'day', remainingHours, 'hour');

    const diffInMonths = Math.floor(diffInDays / 30);
    const remainingDays = diffInDays % 30;
    if (diffInMonths < 12)
      return this.formatTime(diffInMonths, 'month', remainingDays, 'day');

    const diffInYears = Math.floor(diffInMonths / 12);
    const remainingMonths = diffInMonths % 12;
    return this.formatTime(diffInYears, 'year', remainingMonths, 'month');
  }

  private formatTime(mainValue: number, mainUnit: string, extraValue: number, extraUnit: string): string {
    const mainKey = mainValue > 1 ? `${mainUnit}s` : mainUnit;
    const extraKey = extraValue > 1 ? `${extraUnit}s` : extraUnit;

    const mainPart = this.translate.instant(`time.${mainKey}`, { value: mainValue });
    const extraPart = extraValue > 0
      ? ' ' + this.translate.instant(`time.${extraKey}`, { value: extraValue })
      : '';

    return `${mainPart}${extraPart} ${this.translate.instant('time.ago')}`;
  }

}