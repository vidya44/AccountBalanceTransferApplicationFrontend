import { Injectable } from '@angular/core';
import { Customer } from '../Model/Customer.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  [x: string]: any;
  loginCustomer(user: Customer) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/customer'; // backend API URL

  constructor(private http: HttpClient) {}

  registerCustomer(customer: Customer): Observable<Customer> {
    const registerUrl = `${this.apiUrl}/register`;

    return this.http.post<Customer>(registerUrl, customer);
  }

  loginUser(customer: Customer): Observable<Customer> {
    const loginUrl = `${this.apiUrl}/login`;

    return this.http.post<Customer>(loginUrl, customer);
  }

  logoutUser(userName: string): Observable<string> {
    const logoutUrl = `${this.apiUrl}/logOut/${userName}`;
    
    return this.http.get(logoutUrl, {
      responseType: 'text',
      observe: 'response' //  'response' to get the full response
    }).pipe(
      map(response => response.body as string)
    );
  }
  
  // logoutUser(userName:string): Observable<String> {
  //   const logoutUrl = `${this.apiUrl}/logOut/${userName}`;
  //   return this.http.get<string>(logoutUrl);
  // }

  getCustomerByUsername(userName:string): Observable<Customer> {
    const getCustomerUrl = `${this.apiUrl}/getCustomerByUsername/${userName}`;
    return this.http.get<Customer>(getCustomerUrl);
  }

  updateCustomer(userName: string, updatedCustomer: Customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateCustomer/${userName}`, updatedCustomer);
  }

 
 


}
