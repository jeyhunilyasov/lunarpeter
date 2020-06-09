import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // endPoint: any = 'http://localhost:3004/';
  endPoint: any = 'http://lunarpeter.com/api/';
  constructor(
    private http: HttpClient
  ) { }

  login(password): Observable<any> {
    let data = {
      password: password
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.endPoint + 'login', data, options);
  }

  checkAuth() {
    let isAuthenticated = window.localStorage.getItem('isDodoUserAuthorized');
    if (isAuthenticated && isAuthenticated === 'true') {
      return true;
    } else {
      return false;
    }
  }
}
