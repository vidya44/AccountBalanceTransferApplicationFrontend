import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Model/Customer.model';
import { AuthService } from 'src/app/Services/auth.service';
import { CustomerService } from 'src/app/Services/customer.service';
import { TimerService } from 'src/app/Services/timer.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  customer: Customer = {
    userName: '',
    password: '',
    loginTime: undefined,
    logoutTime:undefined,
    customerName: '',
   // lastName: '',
    aadhaarNumber: '',
    accountNumber:'',
    accountBalance:'',
    mobileNumber: '',
    dateOfBirth: ''
  };

  constructor(private customerService: CustomerService, private router: Router,private authService:AuthService,private timerService:TimerService) {}

  
  login(loginForm: NgForm): void {
    this.customerService.loginUser(this.customer).subscribe(
      (response: Customer) => {
        // Handle successful login
        alert('Login successful!');
        console.log('Login successful', response);
        this.authService.setLoggedIn(true);
        // Reset the timer when the user performs any activity
      this.timerService.resetTimer();
        let token = (response.userName);
        localStorage.setItem("token",token);
        console.log(token);
        // Display login time
        if (response.loginTime) {
          console.log('Login Time: ' + response.loginTime);
        }

        // Redirect to user-details or any other page
       this.router.navigate(['/user-details']);
      },
      (error: any) => {
        // Handle login errors
        alert('User not found. Please check your credentials and try again.');
        console.log('Login failed. Please check your credentials and try again.')
      }
    );
  }
}
