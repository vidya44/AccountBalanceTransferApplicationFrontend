import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/Services/transaction.service';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent {
  amount: number = 0;

  constructor(private transactionService :TransactionService, private router: Router) {}

  addMoney(): void {
    // Get the currently logged-in user's username
    const userName = localStorage.getItem('token') ?? '';

      // Additional check for amount
    if (this.amount <= 0) {
    alert('Amount should be a positive value or greater than 0 value.');
    return;
    }
    
    // Call the service method to add money
    this.transactionService.addMoney(userName, this.amount).subscribe(
      (response) => {
        alert("Money added sucessfully")
        console.log('Money added successfully:', response);
        
        // Redirect to a user-details
        this.router.navigate(['/user-details']);
      },
      (error) => {
        alert('Error while adding money please check your ammount:')
        console.error('Error adding money:', error);
        // Handle errors or redirect to an error page
       // this.router.navigate(['/error']);
      }
    );
  }

}
