// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SessionTimeoutService {

//   constructor() { }
// }


import { Injectable, NgZone } from '@angular/core';
import { Subject, timer, Subscription, fromEvent, merge } from 'rxjs';
import { takeUntil, finalize, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {
  private sessionTimeoutMs = 1 * 60 * 1000; // Total session time (e.g., 30 minutes)
  private warningTimeMs = 1 * 60 * 1000;    // Warning time (2 minutes)
  private timeoutInterval$ = timer(0, 1000); // Emits every second
  private sessionSubscription?: Subscription;
  private activitySubscription?: Subscription;
  private readonly USER_ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'scroll'];

  // Subject to notify components when the warning should appear
  private readonly onWarning = new Subject<number>();
  public readonly onWarning$ = this.onWarning.asObservable();
  
  // Subject to notify components when the session has timed out
  private readonly onTimeout = new Subject<void>();
  public readonly onTimeout$ = this.onTimeout.asObservable();

  constructor(private ngZone: NgZone) {}

  public startWatching(): void {
    // Monitor user activity to reset the timer
    this.ngZone.runOutsideAngular(() => {
      const events = this.USER_ACTIVITY_EVENTS.map(eventName =>
        fromEvent(window, eventName).pipe(debounceTime(300))
      );
      this.activitySubscription = merge(...events)
        .subscribe(() => {
          this.ngZone.run(() => this.resetTimer());
        });
    });

    this.resetTimer();
  }

  public resetTimer(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }

    const expirationTime = Date.now() + this.sessionTimeoutMs;

    this.sessionSubscription = this.timeoutInterval$
      .subscribe(() => {
        const timeRemaining = expirationTime - Date.now();

        if (timeRemaining <= this.warningTimeMs && timeRemaining > 0) {
          // Notify that warning should be shown with remaining time in seconds
          this.ngZone.run(() => this.onWarning.next(Math.ceil(timeRemaining / 1000)));
        } else if (timeRemaining <= 0) {
          // Notify that session has timed out
          this.ngZone.run(() => this.onTimeout.next());
          this.stopWatching();
        }
      });
  }

  public stopWatching(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
    if (this.activitySubscription) {
        this.activitySubscription.unsubscribe();
    }
  }

  // Method to extend session (call backend API to refresh token here)
  public extendSession(): void {
    console.log('Session extended, resetting timer...');
    // In a real app, you would make an HTTP request here to extend the session on the server
    this.resetTimer();
  }
}