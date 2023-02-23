import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: number[], ...args: unknown[]): string {
    let [day, month] = value
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    return `${day+1} ${months[month]}`
  }

}
