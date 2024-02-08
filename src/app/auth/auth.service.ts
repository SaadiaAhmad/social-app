import { Injectable } from '@angular/core';
import { User } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStatus$ = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  getToken(): string {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatus$.asObservable();
  }

  createUser(user: User) {
    this.httpClient.post('http://localhost:3000/api/user/signup', user)
      .subscribe(data => console.log("Signup: ", data));
  }

  loginUser(user: User) {
    this.httpClient.post<{ message: string, token: string, expiresIn: number }>('http://localhost:3000/api/user/login', user)
    .subscribe(data => {
      this.token = data.token;
      if(this.token) {
        this.setAuthenticationFlags(true);
        this.setTokenTimer(data.expiresIn);
        this.navigateToHomepage();
      }
    });
  }

  logout() {
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.setAuthenticationFlags(false);
    this.navigateToHomepage();
  }

  private setAuthenticationFlags(val: boolean) {
    this.isAuthenticated = val;
    this.authStatus$.next(val);
  }

  private navigateToHomepage() {
    this.router.navigate(['/']);
  }

  private setTokenTimer(expiresInDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expiresInDuration * 1000);
  }
}
