import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'matchfilter',
  pure: false
})
export class GroupFilter implements PipeTransform {
  transform(items: any[], filters: any): any {
    if (!items || !filters) {
      return items;
    }

    const week = filters.week;

    if (week === 'Upcoming Matches') {
      return items
        .filter(item => item.dateTime >= Date.now())
        .slice(0, 10);
    } else if (week === 'Recent Matches') {
      return items
        .filter(item => item.dateTime <= Date.now())
        .slice(0, 10);
    } else {
      return items.filter(item => item.matchday == week);
    }
  }
}
