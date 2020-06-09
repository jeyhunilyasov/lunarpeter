import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  // endPoint: any = 'http://localhost:3004/';
  endPoint: any = 'http://lunarpeter.com/api/';
  constructor(
    private http: HttpClient
  ) { }

  getAllList(): Observable<any> {
    return this.http.get(this.endPoint + 'csv');
  }

  getProductListByCategory(category): Observable<any> {
    return this.http.get(this.endPoint + 'products?category=' + category);
  }

  getPaymentTermsAndService(): Observable<any> {
    return this.http.get(this.endPoint + 'paymentTerms');
  }

  placeOrder(data): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.endPoint + 'placeOrder', data, options);
  }
}
