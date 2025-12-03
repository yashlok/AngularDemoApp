import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   let flag = sessionStorage.getItem("flag");
//   return flag == "1" ? true : false;
// };

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isLoggedIn()
    ? true
    : inject(Router).navigate(['/login']);
};


// export class authGuard implements CanActivate {
//   constructor(private auth: AuthService, private router: Router) {}
//   canActivate(): boolean {
//      alert('AuthGuard#canActivate called');
//     if (this.auth.isLoggedIn()) {
//       alert('AuthGuard#canActivate returns true');
//       return true;
//     } else {
//       alert('AuthGuard#canActivate returns false');
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }