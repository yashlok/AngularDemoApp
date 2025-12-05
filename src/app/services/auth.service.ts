import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  private loggedInAdmin = new BehaviorSubject<boolean>(false);  
  isAdminLoggedIn = this.loggedInAdmin.asObservable();

     
  Login() {
    //this.loggedIn = true;
    // Implement your login logic (e.g., API call, set token)
    localStorage.setItem('currentUser', 'someUser'); // Simulate login
    this.loggedInUser.next(true);
    this.loggedInAdmin.next(true);
    console.log('User log in :  this.loggedInUser');
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token'));
    }

    return this.httpClient.post('https://dummyjson.com/auth/refresh', 
      { refreshToken },
      { headers: this.httpHeaders }
    ).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
      })
    );
  }

  Logout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    localStorage.setItem('Islogin', 'false');
    localStorage.setItem('IsAdmin', 'false');
    this.loggedInUser.next(false);
    this.loggedInAdmin.next(false);
    console.log('User logged out');
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem("Islogin") === 'true';
    if (isLoggedIn && this.isTokenExpired()) {
      this.refreshToken().subscribe({
        error: () => this.Logout()
      });
    }
    this.loggedInUser.next(isLoggedIn);
    return isLoggedIn;
  }
  isAdminLoggedInn(): boolean {
    const isAdminLoggedIn = localStorage.getItem("IsAdmin") === 'true';
    this.loggedInAdmin.next(isAdminLoggedIn);
    return isAdminLoggedIn;
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
    const loggedInAdmin = localStorage.getItem("IsAdmin");
    if(loggedInAdmin === 'true')
    {
       this.loggedInAdmin.next(true);
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

