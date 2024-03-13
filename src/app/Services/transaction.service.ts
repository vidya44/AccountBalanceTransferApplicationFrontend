import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../Model/Transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  

  private apiUrl = 'http://localhost:8080/transaction'; //  backend API URL

  constructor(private http: HttpClient) {}
  

  addMoney(userName: string, amount: number): Observable<Transaction> {
    const addMoneyUrl=`${this.apiUrl}/addMoney?userName=${userName}&amount=${amount}`;
    return this.http.post<Transaction>(addMoneyUrl,{});
  }

  sendMoney(senderUserName: string, receiverUserName: string, amount: number): Observable<Transaction>{

    const sendMoneyUrl = `${this.apiUrl}/sendMoney?senderUserName=${senderUserName}&receiverUserName=${receiverUserName}&amount=${amount}`;
    return this.http.post<Transaction>(sendMoneyUrl, {});
  }

  getTransactionsByUsername(userName: string): Observable<Transaction[]>{
    const getTransactionsUrl=`${this.apiUrl}/getTransactionsByUsername/${userName}`;
    return this.http.get<Transaction[]>(getTransactionsUrl);

  }
     
}
