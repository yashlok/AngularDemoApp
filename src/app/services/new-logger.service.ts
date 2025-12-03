import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewLoggerService {
private name: string = '';
  
constructor() { 
    console.log('New LoggerService Object created');
  }

   setName(nm:string){
    this.name = nm;
    console.log('Names is set in DB:' + this.name);
  }

  getName(){
    console.log('Name in DB='+this.name);
  }
}
