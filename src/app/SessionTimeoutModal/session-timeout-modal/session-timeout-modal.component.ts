import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionTimeoutService } from '../../services/session-timeout.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
 selector: 'app-SessionTimeoutModal',
  template: `<div *ngIf="showModal && isLoggedIn" class="modal-overlay" (click)="closeModal()">
      <div class="modal-dialog" (click)="$event.stopPropagation()">
        <button type="button" class="close-btn" (click)="closeModal()" title="Close">&times;</button>
        <h2>Session Expiring Soon!</h2>
        <p>Your session will time out in {{ timeLeft }} seconds.</p>
        <p>Are you sure you want to extend your time?</p>
        <button type="button" (click)="extendSession()">Extend Session</button>
        <button type="button" (click)="logout()">Log Out</button>
      </div>
    </div>`,
  styleUrls: ['./session-timeout-modal.component.css'],
  imports: [CommonModule]
})

export class SessionTimeoutModalComponent implements OnInit, OnDestroy {
  showModal = false;
  timeLeft = 0;
  private warningSubscription?: Subscription;
  private timeoutSubscription?: Subscription;
  private authSubscription?: Subscription;
  private isLoggedIn = false;

  constructor(private sessionTimeoutService: SessionTimeoutService, private router: Router,
    private authService: AuthService
   ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedInU.subscribe(status => {
      this.isLoggedIn = status;
      if (!status) {
        this.showModal = false;
      }
    });

    // this.warningSubscription = this.sessionTimeoutService.onWarning$.subscribe(seconds => {
    //   if (this.isLoggedIn) {
    //     this.timeLeft = seconds;
    //     this.showModal = true;
    //   }
    // });

    // this.timeoutSubscription = this.sessionTimeoutService.onTimeout$.subscribe(() => {
    //   this.showModal = false;
    //   alert('Your session has timed out.');
    //   this.authService.Logout();
    //   // Add logic to force logout/redirect to login page
    //   this.router.navigate(['/login']);
    // });
  }

  ngOnDestroy(): void {
    this.warningSubscription?.unsubscribe();
    this.timeoutSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }

  extendSession(): void {
    console.log('Extend session clicked');
    this.sessionTimeoutService.extendSession();
    this.showModal = false;
  }

  logout(): void {
    console.log('Logout clicked');
    this.sessionTimeoutService.stopWatching();
    this.showModal = false;
    this.authService.Logout();
    this.router.navigate(['/login']);
  }

  closeModal(): void {
    console.log('Close modal clicked');
    this.showModal = false;
  }
}
