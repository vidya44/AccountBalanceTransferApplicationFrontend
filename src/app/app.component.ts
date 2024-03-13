import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { TimerService } from './Services/timer.service';
import { CustomerService } from './Services/customer.service';
import { Observable, catchError, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AccBalanceTransferApp';
  isLoggedIn: boolean=false;
 // remainingTime: number = 0; // Add this property
  formattedTime!: string;
  formattedTime$!: Observable<string>;
  
  constructor(private router: Router,public authService: AuthService,public timerService:TimerService,
    private customerService:CustomerService){}

    
  ngOnInit(): void {

    
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
  
      console.log('Is Logged In:', this.isLoggedIn);
      //this.authService.setLoggedIn(this.isLoggedIn);
  
      if (this.isLoggedIn ) {
        console.log('User is logged in');
  
        // Subscribe to the timer expiration
        this.timerService.expiration$.pipe(take(1)).subscribe(() => {
         // alert('Session has expired. Please log in again.');
         
          console.log('Session has expired. Logging out.');

          // this.authService.setLoggedIn(false);
         this.logout();

         
          // Redirect to the login page or any other desired action
          //this.router.navigate(['/signin']);
           
        });

      
        // Access formattedTime$ observable directly from TimerService
        this.timerService.formattedTime$.subscribe((formattedTime: string) => {
          this.formattedTime = formattedTime;
         // console.log('Formatted time is:', this.formattedTime);
         
        });

         // Start the timer when there is user activity
      this.timerService.startTimer(300); // Adjust the time as needed
        
       // Reset the timer when there is user activity
       // this.timerService.resetTimer();
      }
        
    });
  

    // Check if the user is already logged in
  const userName = localStorage.getItem('token') ?? '';
  this.isLoggedIn = !!userName;
  this.authService.setLoggedIn(this.isLoggedIn);
  }

  

  redirectToRegistration() {
    // Use Angular Router to navigate to the registration page
    this.router.navigate(['/signup']);
  }

  redirectToLogin() {
    this.router.navigate(['/signin']);
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }

  
  logout(): void {
    // Fetch the current user details from local storage
    const userName = localStorage.getItem('token') ?? '';
    console.log(userName);
    console.log("logout");

   // Perform logout through the service
  this.customerService.logoutUser(userName).subscribe(
    (response:string) => {
      if(response === 'Logged out successfully'){
      alert('User logged out successfully:');
     // console.log(response);
      this.authService.setLoggedIn(false);
      // Reset the timer when the user logs out
      this.timerService.resetTimer();
      // Clear local storage
      localStorage.removeItem('token');
      // Redirect to home or any other page
      this.router.navigate(['/home']);
    }
    else{
      console.error('Error logging out. Unexpected response:', response);
      alert('Error logging out. Please try again.');
    }
    },
    (error: any) => {
      console.error('Error logging out:', error);
      // Handle other errors
      alert('Error logging out. Please try again.');
    }
  );
  }
}