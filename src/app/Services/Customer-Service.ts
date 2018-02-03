import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Customer } from '../models/customer';
import { AppError } from '../error-handle/app-error';

@Injectable()
export class CustomerService {
  // CustomerList array of customer
  private customerList: Customer[] = [];
   // { id: 1, name: 'John', phone: '9988776655', email: 'john@abc.xyz', city: 'Bengaluru', DOB: '12-10-2010' },
   // { id: 2, name: 'Asif', phone: '1122334455', email: 'asif@abc.xyz', city: 'Chennai', DOB: '12-10-2010' },
   // { id: 3, name: 'Hari', phone: '3355776644', email: 'hari@abc.xyz', city: 'Mumbai', DOB: '12-10-2010' },
   // { id: 4, name: 'Amar', phone: '2244668800', email: 'amar@abc.xyz', city: 'New Delhi', DOB: '12-10-2010'}
  // customer list API
  private apiURL = 'http://localhost:3000/customers';
  // index list API
  private indexURL = 'http://localhost:3000/indexList';
  constructor(private http: Http) {}
  // returns the CustomerList
  getCustomerList(): Observable<Customer[]> {
   // return this.customerList;
    return this.http
      .get(this.apiURL)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
// get the customer based on his id
  getCustomer(id: number): Observable<Customer> {
    return this.http
      .get(this.apiURL + '/' + id)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
// update the customer based on his id
  updateCustomer(id: number, CustomerInfo: Customer): Observable<Customer> {
    return this.http
      .patch(this.apiURL + '/' + id, CustomerInfo)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  // Stores a customer to the CustomerList

  storeCustomer(customer: Customer): Observable<Customer> {
    // const headers = new Headers({ 'content-Type': 'application/json' });
    // headers.append('Accept', 'application/json');
    // const options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.apiURL, customer)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  // store the customer index of the newly added customer
  storeIndex(id: number): Observable<number> {
     const headers = new Headers({ 'content-Type': 'application/json' });
     headers.append('Accept', 'application/json');
     const options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.indexURL, id)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  // delete the customer based on his id
  deleteCustomer(id: number): Observable<Customer> {
    return this.http
      .delete(this.apiURL + '/' + id)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  // error handling
  private handleError(error: Response) {
  return Observable.throw(new AppError(error));
  }
}


