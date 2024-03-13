import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Model/Customer.model';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-register-customer',
  templateUrl: './register-customer.component.html',
  styleUrls: ['./register-customer.component.css']
})
export class RegisterCustomerComponent {
  customer: Customer = {
    customerName: '',
    aadhaarNumber: '',
    accountNumber:'',
    accountBalance:'20000',
    mobileNumber: '',
    dateOfBirth: '',
    userName: '',
    password: '',
    loginTime: undefined,
    logoutTime: undefined
  };
  
  constructor(private customerService: CustomerService,private router: Router) {}

  register(registrationForm: NgForm): void {
    // Additional frontend validation
   
    var dob = new Date(this.customer.dateOfBirth);
    var currentDate = new Date();
    console.log('Current Date is:',currentDate);

   // Set the cutoff date to January 1, 2010
   var cutoffDate = new Date('2010-01-01');

  // Compare the full date components
  if (dob >= currentDate || dob > cutoffDate) {
  // Display an error or alert for invalid dateOfBirth
  console.log('Date of Birth:', this.customer.dateOfBirth);
  alert('Date of birth should be before the current date of 2010.');
  return;
}

     // Aadhaar Number Validation
     const aadhaarNumberPattern = /^[0-9]{12}$/;
     if (!aadhaarNumberPattern.test(this.customer.aadhaarNumber.toString())) {
       alert('Aadhaar number should be 12 digits and contain only numbers.');
       return;
     }

    // Mobile Number Validation
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumberPattern.test(this.customer.mobileNumber)) {
      alert('Mobile number should be 10 digits and contain only numbers.');
     // console.log('Date of Birth:', this.customer.mobileNumber);
      return;
    }

    // Password should start with a capital letter
    if (!/^[A-Z].*/.test(this.customer.password)) {
    alert('Password should start with a capital letter.');
      return;
    }

    // Password Length Validation
    if (this.customer.password.length < 8) {
      alert('Password should be at least 8 characters long.');
      return;
    }

    // Call the backend service to register the customer
    this.customerService.registerCustomer(this.customer).subscribe(
      (response: any) => {
        // Handle successful registration
        alert('Registration successful!');
        console.log('Registration successful', response);
        console.log('Form is valid:', registrationForm.valid);
        console.log('Form is valid:', registrationForm.invalid);

        // Redirect to login or home page
        this.router.navigate(['/signin']);
      },
      (error: any) => {
        if(error.status==400){
          alert('User with given credential is already registered.');
        }
        // Handle registration errors
       
       alert('Registration failed. Please check your inputs and try again.');
        console.log('Registration failed. Please check your inputs and try again.');


      }
    );
  }
}
