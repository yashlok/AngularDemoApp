import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mycustom'
})
export class MycustomPipe implements PipeTransform {

  transform(value: string[], ...args: string[]): string[] {
    //return args[0] + " " + args[1] + " " + value;

    // //sample 2
    // let val = value as string;
    // let prefixChar = args[1];
    // let fillChar = args[0];
    // let newval = val.toString().padStart(10,fillChar);
    // return prefixChar + newval;


    //sample 3
    let searchText = args[0];
    if (searchText !== '') {
      {
        let filteredNames = value.filter(d => d.includes(searchText));
        return filteredNames;
      }
    }

    return value;


  }

}
