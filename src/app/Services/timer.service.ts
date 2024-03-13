import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, Subscription, finalize, map, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  
 
 
  private expirationSubject = new Subject<void>();
  expiration$ = this.expirationSubject.asObservable();
  private timerSubject = new BehaviorSubject<number>(0);
  timer$: Observable<number> = this.timerSubject.asObservable();

  private timer: any;

   // Add a new observable for formatted time
   formattedTime$: Observable<string> = this.timer$.pipe(
    map(timeInSeconds => this.formatTime(timeInSeconds))
  );
 // private timerSubscription!: Subscription;

  
  constructor() {
    
    //this.resetTimer();
  }

  // resetTimer(): void {
  //   if (this.timer) {
  //     this.timerSubject.next(0);
  //     this.timerSubject.complete();
  //   }
  // }

  startTimer(duration: number): void {
    console.log('Timer started');
    this.timer = timer(0, 1000).pipe(
      map((elapsedSeconds) => Math.max(duration - elapsedSeconds)),
      takeWhile((remainingTime) => remainingTime >= 0),
      tap((remainingTime) => this.timerSubject.next(remainingTime)),
      finalize(() => {
        this.timerSubject.next(0);
        this.expirationSubject.next();
      })
    );

    this.timer.subscribe({
      complete: () => this.expirationSubject.next()
    });
  }

  resetTimer(): void {
    if (this.timer) {
      this.timerSubject.next(0);
     // this.timerSubject.complete();
    }
  }

  formatTime(timeInSeconds: number): string {
    const minutes: string = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds: string = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

}
