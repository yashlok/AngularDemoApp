import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   httpClient = inject(HttpClient);
  constructor() { }

   getUsers1()  {
   return this.httpClient.get<User>('https://jsonplaceholder.typicode.com/users/1');
 }

 getUsers2() {
   return this.httpClient.get<User>('https://jsonplaceholder.typicode.com/users/2');
}

 getUsers3() {
   return this.httpClient.get<User>('https://jsonplaceholder.typicode.com/users/3');
}

















//   getUsers1(): Observable<User[]> {
//    return this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users/1');
//  }

//   getUsers2(): Observable<User[]> {
//    return this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users/2');
//  }

//  getUsers3(): Observable<User[]> {
//    return this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users/3');
//   }

}
