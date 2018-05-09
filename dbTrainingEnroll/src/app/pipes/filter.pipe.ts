import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, term: any, propName: string): any {
    if (term === undefined || term === '' || term === 0) {
       return value;
     }
     const filteredTrainings = [];
     for (const item of value) {
       if (item[propName].toLowerCase().includes(term.toLowerCase())) {
        filteredTrainings.push(item);
     }
    }
     return filteredTrainings;
  }
}
