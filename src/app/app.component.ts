import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstsampleComponent } from './firstsample/firstsample.component';
import { DatabindingComponent } from './databinding/databinding.component';
 
import { NavbarComponent } from "./navbar/navbar.component";
import { MessageService } from './services/message.service';
import { LoggerService } from './services/logger.service';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SessionTimeoutService } from './services/session-timeout.service';
import { Product } from  './models/product';
import { ProductService } from './services/product.service';
import { SessionTimeoutModalComponent } from './SessionTimeoutModal/session-timeout-modal/session-timeout-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    FirstsampleComponent,
    DatabindingComponent,
    SessionTimeoutModalComponent,
 
    RouterOutlet,
    NavbarComponent,
    CommonModule   
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 productService = inject(ProductService);
  title = 'myapp';
  messageService = inject(MessageService);
  message: string = '';
  isAuthenticated: boolean = false;
    //private authSubscription!: Subscription;
     products: Product[];

  @ViewChild('divAlert')
  divAlert!: ElementRef;
 constructor(public auth: AuthService, private logger: LoggerService, private authService: AuthService, private sessionTimeoutService: SessionTimeoutService) {
    this.products = [];
 }
  ngOnInit(): void {
     //this.authSubscription = this.authService.isLoggedInU.subscribe(status => {
      this.authService.isLoggedInU.subscribe(status => {
      this.isAuthenticated = status;
    });
     
    this.loadProducts();

     this.sessionTimeoutService.startWatching();
    this.messageService.fetchMessage().subscribe({
      next: (response) => {
        this.divAlert.nativeElement.style.display = 'block';
        this.message = response;
        setTimeout(() => {
           this.divAlert.nativeElement.style.display = 'none';
           this.message = "";
        }, 3000);
      },
      error: (err) => {
        this.message = err;
      }
    }); 
    
    console.log('AppComponent initialized isAuthenticated. Is user logged in?', this.isAuthenticated);
  }
  

  private loadProducts() {
    this.productService.getProducts().subscribe({
      next: (resp) => {
        this.products = resp;
      },
      error: (err) => {
        console.log("Error", err);
      }
    })
  }

}
