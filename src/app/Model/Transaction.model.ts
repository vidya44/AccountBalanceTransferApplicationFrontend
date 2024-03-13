import { Customer } from "./Customer.model";

export enum TransactionType {
    ADD_MONEY = 'ADD_MONEY',
    SEND_MONEY = 'SEND_MONEY'
  }

export interface Transaction {
    transactionId: number;
    transactionType: TransactionType; 
    amount: number;
    addMoneyTimestamp: string; // Represented as a string
    sendMoneyTimestamp: string; // Represented as a string
    customer: Customer;
  }