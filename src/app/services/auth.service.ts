import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { Login } from '../models/login';
import {BehaviorSubject  } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = true;

  private loggedInUser = new BehaviorSubject<boolean>(false); // Initial state: not logged in
  isLoggedInU = this.loggedInUser.asObservable();

     
  Login() {
    //this.loggedIn = true;
    // Implement your login logic (e.g., API call, set token)
    localStorage.setItem('currentUser', 'someUser'); // Simulate login
    this.loggedInUser.next(true);
    console.log('User log in :  this.loggedInUser');
  }

  Logout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    localStorage.setItem('Islogin', 'false');
    this.loggedInUser.next(false);
    console.log('User logged out');
  }

  isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem("Islogin") === 'true';
    this.loggedInUser.next(isLoggedIn);
    return isLoggedIn;
  }


user: User | undefined;
  httpHeaders: HttpHeaders;
  constructor(  private httpClient: HttpClient  ) {
    this.httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
   // this.LoadAuthUser();
   const loggedInUser= localStorage.getItem("Islogin");
    if(loggedInUser === 'true')
    {
       this.loggedInUser.next(true);
    }
  }

  ValidateUser( model: Login): Observable<HttpResponse<Login>> {
    //console.log('In Auth Service', JSON.stringify(Login));
    return this.httpClient.post<Login>(
      'https://dummyjson.com/auth/login',
      JSON.stringify(Login),
      { headers: this.httpHeaders, observe: 'response' },
    );
  }

  // UserSignUp(model: UserSignup): Observable<HttpResponse<any>> {
  //   return this.httpClient.post<any>(
  //     environment.apiAddress + '/auth/createuser',
  //     JSON.stringify(model),
  //     { headers: this.httpHeaders, observe: 'response' },
  //   );
  // }

  //  AdminSignUp(model: UserSignup): Observable<HttpResponse<any>> {
  //   return this.httpClient.post<any>(
  //     environment.apiAddress + '/auth/createadminuser',
  //     JSON.stringify(model),
  //     { headers: this.httpHeaders, observe: 'response' },
  //   );
  // }

  // private LoadAuthUser() {
  //   const encData = localStorage.getItem(AUTH_ID);
  //   if (encData !== undefined && encData !== null) {
  //     this.user = this.utilService.Decrypt(encData);
  //   } else {
  //     this.user = undefined;
  //   }
  //   console.log(this.user);
  // }

  SetAuthUser(user: User) {
    console.log('Auth info', JSON.stringify(user));
    // let userData = this.utilService.Encrypt(user);
    // localStorage.setItem("AUTH_ID", user);
    //  this.LoadAuthUser();
  }

  // RemoveAuthUser() {
  //   const data = localStorage.getItem(AUTH_ID);
  //   if (data !== undefined && data !== null) {
  //     localStorage.removeItem(AUTH_ID);
  //     this.user = undefined;
  //   } else {
  //     this.user = undefined;
  //   }
  //   this.LoadAuthUser();
  // }

}

