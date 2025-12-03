import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionTimeoutService } from '../../services/session-timeout.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
 selector: 'app-SessionTimeoutModal',
  template: `<div *ngIf="showModal" class="modal-overlay">
      <div class="modal-dialog">
        <button class="close-btn" (click)="closeModal()">&times;</button>
        <h2>Session Expiring Soon!</h2>
        <p>Your session will time out in {{ timeLeft }} seconds.</p>
        <p>Are you sure you want to extend your time?</p>
        <button (click)="extendSession()">Extend Session</button>
        <button (click)="logout()">Log Out</button>
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

  constructor(private sessionTimeoutService: SessionTimeoutService, private router: Router,
    private authService: AuthService
   ) {}

  ngOnInit(): void {
    this.warningSubscription = this.sessionTimeoutService.onWarning$.subscribe(seconds => {
      this.timeLeft = seconds;
      this.showModal = true;
    });

    this.timeoutSubscription = this.sessionTimeoutService.onTimeout$.subscribe(() => {
      this.showModal = false;
      alert('Your session has timed out.');
      this.authService.Logout();
      // Add logic to force logout/redirect to login page
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.warningSubscription?.unsubscribe();
    this.timeoutSubscription?.unsubscribe();
  }

  extendSession(): void {
    this.sessionTimeoutService.extendSession();
    this.showModal = false;
  }

  logout(): void {
    this.sessionTimeoutService.stopWatching();
    this.showModal = false;
    this.authService.Logout();
  }

  closeModal(): void {
    this.showModal = false;
  }
}
