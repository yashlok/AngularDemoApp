import { Injectable } from '@angular/core';

//Tree Shaking = Its a compiler option that checks if the service is not referenced anywhere, then it will remove the code from the main bundle 
//This reduces the size of the bundle & helps in performance
@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private name: string = '';
  constructor() { 
    console.log('LoggerService Object created');
  }

  setName(nm:string){
    this.name = nm;
    console.log('Names is set:' + this.name);
  }

  getName(){
    console.log('Name='+this.name);
  }
}
