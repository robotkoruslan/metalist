import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';

@Pipe({name: 'ruDate'})

export class RuDatePipe implements PipeTransform {
  transform(value: Date): string {
    moment.locale('ru');
    return moment(value).format('DD MMMM YYYY HH:mm');
  }
}
