import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/Model/Transaction.model';
import { TransactionService } from 'src/app/Services/transaction.service';

@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.css']
})
export class SendMoneyComponent {
  receiverUserName: string = '';
  amount: number = 0;

  constructor(private transactionService: TransactionService, private router: Router) {}

  sendMoney(sendMoneyForm: NgForm): void {
    // Get the currently logged-in user's username
    const senderUserName = localStorage.getItem('token') ?? '';

     // Additional check for amount
      if (this.amount <= 0) {
      alert('Amount should be a positive or greater than 0 value.');
      return;
     }

    this.transactionService.sendMoney(senderUserName,this.receiverUserName, this.amount).subscribe(
      (response: Transaction) => {
        // Handle successful sendMoney
        alert('Money sent successfully!');
        console.log('Money sent successfully', response);

        // Redirect to home or any other page
        this.router.navigate(['/user-details']);
      },
      (error: any) => {
        if (error.status === 404) {
          alert('Failed to send money. Please try again later.');
        } else if (error.status === 400) {
          alert('Failed to send money. Sender doesn\'t have enough balance to make transaction.');
        } else {
           alert('Account not found with given user. Please check the receiver username and try again.');
        }
        console.log('Failed to send money', error);
      }
    );
  }

}
