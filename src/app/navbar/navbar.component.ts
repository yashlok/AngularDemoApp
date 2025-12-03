import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
  

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive, 
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   isAuthenticated: boolean = false;
  private authSubscription!: Subscription;
  constructor(private router: Router, private authService: AuthService) {}
  // ngOnInit(): void {
  //   console.log('Navbar initialized');
  //   console.log('Is user logged in?', localStorage.getItem('Islogin'));
  // }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedInU.subscribe(status => {
      this.isAuthenticated = status;
    });
  }


  onLogout() {
   // alert('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.setItem('Islogin','false');
    console.log('User logged out, localStorage cleared.');
    this.authService.Logout();
    this.router.navigate(['/login']);
  }

   onLogin() {
    this.authService.Login();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
