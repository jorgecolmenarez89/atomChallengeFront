import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  apiUrl = environment.apiBaseUrl;
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  isAuth() {
    return localStorage.getItem('email') ? true : false;
  }

  login(email: string){
    return this.http.get(`${this.apiUrl}/users/${email}`);
  }

  register(email: string) {
    return this.http.post(`${this.apiUrl}/users`, {email}, {headers: this.httpHeaders});
  }

  logout() {
    localStorage.removeItem('email');
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

}
