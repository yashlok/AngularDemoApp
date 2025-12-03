import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Login } from '../../models/login';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   Login = {
    username: '',
    password: '',
    accessToken: ''
  };
 

  constructor(private HttpClient: HttpClient, private router: Router, private auth: AuthService) {
    console.log('Login Component initialized ....');
  }
    
 
loginSubmit(form: any) {
  if (form.invalid) return;
    console.log(form.value.username);
   // let  u =form.value.username.split("user")[1];
     let admin = form.value.username.indexOf("admin") !== -1;
    if (admin){    alert('Admin login: ' + admin)};
    let  user =form.value.username.replace("user","").replace("admin","");
    alert('Welcome '+ user);
  const body = {    
    username:  user,   //form.value.username,
    password: form.value.password  
  };
     this.HttpClient.post<any>('https://dummyjson.com/auth/login', body,
    {
      headers: { 'Content-Type': 'application/json' }
    })
    .subscribe({
      next: (res) => {
        console.log(res);
       // alert("Login success!");
         // Save token
         localStorage.setItem('token', res.accessToken);

          // DummyJSON returns refresh token also
          if (res.refreshToken) {
            localStorage.setItem('refreshToken', res.refreshToken);
          }
          // Save user details
          localStorage.setItem('user', JSON.stringify(res.username));
          console.log('username- ', localStorage.getItem('user'));
          localStorage.setItem('Islogin', 'true');
          console.log(localStorage.getItem('Islogin'));
          this.auth.isLoggedIn();
         // this.router.createUrlTree(['/userlist']);
         this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message);
      }
    });
}







//  userForm!: FormGroup;
//   failed: boolean = false;
//   returnUrl: string = '';
//     authService = inject(AuthService);
  
//     loginSubmit(form: NgForm) {
//         console.log(form.value);
//         console.log("Login submitted");
//                 const  Login = {
//                     username: form.value.username,
//                     password: form.value.password
//                 };
//                 console.log(Login)
//             // console.error('username:', Login.username);
//             // console.error('password:', Login.password);   
//         if (form.invalid) return;
//         else {
//             this.authService.ValidateUser( Login).subscribe({
//                 next: (resp) => { console.log('Login successful:', resp);
//       },
//       error: (error) => {
//         // Handle login error (e.g., display error message)
//         console.error('Login failed:', error);
//       },
//     });  
//     }                  
//    }


}
