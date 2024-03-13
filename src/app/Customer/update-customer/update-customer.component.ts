import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Model/Customer.model';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent {
  customer: Customer = {
    userName: '',
    password: '',
    mobileNumber: '',
    loginTime: undefined,
    logoutTime: undefined,
    customerName: '',
    aadhaarNumber: '',
    accountNumber: '',
    accountBalance: '',
    dateOfBirth: ''
  };
  
  // ngOnInIt ():void{
  //   this.updateCustomer();

  // }
  constructor(private customerService:CustomerService,private router:Router){

  }

  

  updateCustomer(updateCustomerForm: NgForm): void {

    const userName = localStorage.getItem('token') ?? '';

    // Mobile Number Validation
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumberPattern.test(this.customer.mobileNumber)) {
      alert('Mobile number should be 10 digits and contain only numbers.');
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

    // Call the customer service to update the customer
    this.customerService.updateCustomer(userName, this.customer).subscribe(
      (updatedCustomer: any) => {
        alert('Customer updated successfully');
        console.log('Customer updated successfully', updatedCustomer);
        // Additional logic or navigation after a successful update

        // Redirect to home or any other page
        this.router.navigate(['/user-details']);
       
        
      },
      (error: any) => {
        alert('Error updating customer,Please check your input.')
        console.error('Error updating customer', error);
      }
    );
  }

 }
