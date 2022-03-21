import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CustomerModel } from './customer-model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseURL: string = 'http://localhost:9090/api/v1/customer/';
  addUser: string = 'http://localhost:9090/api/v1/customer/save';
  // deleteURl: string = 'http://localhost:9090/api/v1/customer/delete';
  constructor(private httpclient: HttpClient) {}

  getCustomerList(): Observable<CustomerModel[]> {
    console.log('Service Loggg checkkkkkk ');
    return this.httpclient.get<CustomerModel[]>(`${this.baseURL}`).pipe(
      catchError((error) => {
        console.log('error in service');
        return throwError(error);
      })
    );
  }
  deleteCustomer(id: number): Observable<CustomerModel[]> {
    return this.httpclient.delete<CustomerModel[]>(
      `${this.baseURL}delete/${id}`
    );
  }
  createCustomer(customer: CustomerModel): Observable<any> {
    return this.httpclient
      .post('http://localhost:9090/api/v1/customer/save', customer)
      .pipe(
        catchError((error) => {
          console.log('Service log for createUser');
          return throwError(error);
        })
      );
  }
  // getCustomerbyId(id: number): Observable<CustomerModel[]> {
  //   return this.httpclient.get<CustomerModel[]>(`${this.baseURL} ${id}`);
  // }
  updateCustomer(customer: CustomerModel, id: number): Observable<any> {
    return this.httpclient.put<CustomerModel>(
      `${this.baseURL}update/${id}`,
      customer
    );
  }
  uniqueValue(id: number, email: string, mobile: string): Observable<any> {
    return this.httpclient.get(`${this.baseURL}email/${email}/${mobile}/${id}`);
  }
}
