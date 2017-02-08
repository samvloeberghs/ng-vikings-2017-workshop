import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-timezone';

@Pipe({
  name: 'tzDate'
})
export class TimezoneDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return moment(value).tz(args[1] || 'Europe/Copenhagen').format(args[0]);
  }
}
