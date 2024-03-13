import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TimerService } from './timer.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  formatTime(timeInSeconds: any) {
    throw new Error('Method not implemented.');
  }

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
 

 
   constructor(private timerService:TimerService,private router:Router) {}

  setLoggedIn(value: boolean): void {
    console.log(`Setting isLoggedIn to: ${value}`);
    this.isLoggedInSubject.next(value);
    if (value) {
      // Start the timer when the user logs in
      this.timerService.startTimer(300); 
    } else {
      // Reset the timer when the user logs out
      this.timerService.resetTimer();
      
    }
  }
   
   isLoggedIn(): boolean {
    
    // return true if there is a valid token in local storage
    return !!localStorage.getItem('token');
  }

  
  
}
