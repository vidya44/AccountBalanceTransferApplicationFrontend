import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/Model/Customer.model';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  
  [x: string]: any;
  loggedInUser!: Customer;

  constructor(private route: ActivatedRoute, private customerService: CustomerService,private router: Router) {}

  ngOnInit(): void {
    

    let currentUsername = localStorage.getItem('token') ?? 'defaultUsername';
    this.customerService.getCustomerByUsername(currentUsername).subscribe(
      (data: Customer) => {
        console.log('User details from service:', data);
        this.loggedInUser=data;
        // Optionally, you can update this.loggedInUser with the data from the service if needed.
      },
      (error) => {
        console.error('Error fetching user details from service', error);
      }
    );

    // this.route.data.subscribe((data: any) => {
    //   if ('loggedInUser' in data && data.loggedInUser !== null) {
    //     this.loggedInUser = data.loggedInUser;
    //     console.log('User details from route resolver:', this.loggedInUser);
    //   } else {
    //     console.error('Error fetching user details from route resolver', data);
    //   }
    // });
  }

  redirectToAddMoney() {
    //  navigate to the addMoney page
    this.router.navigate(['/add-money']);
  }

  redirectToSendMoney() {
    //  navigate to the sendMoney page
    this.router.navigate(['/send-money']);
  }

  redirectToViewTransactions() {
    //  navigate to the view transactions page
    this.router.navigate(['/view-transactions']);
  }

  redirectToUpdateCustomer() {
    //  navigate to the sendMoney page
    this.router.navigate(['/update-customer']);
  }



  // addMoney(): void {
  //   // Logic for adding money
  //   console.log('Adding money...');
  // }

  // sendMoney(): void {
  //   // Logic for sending money
  //   console.log('Sending money...');
  // }

  // viewTransactions(): void {
  //   // Logic for viewing transactions
  //   console.log('Viewing transactions...');
  // }
}
