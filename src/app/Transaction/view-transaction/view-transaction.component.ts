import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/Model/Transaction.model';
import { TransactionService } from 'src/app/Services/transaction.service';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit{
  transactions: Transaction[] = [];
  transactionsByUsername!: Transaction[];

  constructor(private transactionService: TransactionService,private router: Router) {}

  ngOnInit(): void {
    this.viewTransactions();
  }

  viewTransactions(): void {
    const userName = localStorage.getItem('token') ?? '';
    this.transactionService.getTransactionsByUsername(userName).subscribe(
      (response: Transaction[]) => {
        // Handle successful sendMoney
       this.transactionsByUsername=response;
        console.log('Transaction Fetch sucessfully', response);

        // Redirect to home or any other page
       // this.router.navigate(['/user-details']);
      },
      (error: any) => {
        if (error.status === 404) {
          alert('No transactions found for the user.');
          console.log('No transactions found for the user.');
        } else {
          alert('Error fetching transactions.')
          console.error('Error fetching transactions', error);
        }
      }
    );
  }

  redirectToUserDetails() {
    // navigate to user-deatails
    this.router.navigate(['/user-details']);
  }

  
}
