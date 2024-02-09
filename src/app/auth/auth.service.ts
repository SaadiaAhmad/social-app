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

  authenticateUser() {
    const storedAuthData = this.getAuthData();

    if (storedAuthData.token && storedAuthData.expiration) {
      const currentDate = new Date();
      const expirationDatetime = new Date(storedAuthData.expiration);
      const isTokenExpired =  expirationDatetime < currentDate;
      if(!isTokenExpired) {
        const expiresIn = expirationDatetime.getTime() - currentDate.getTime();
        this.token = storedAuthData.token;
        this.setAuthenticationFlags(true);
        this.setTokenTimer(expiresIn / 1000);
      }
    }
  }

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
        this.saveAuthData(this.token, this.generateExpirationDatetime(data.expiresIn));
        this.navigateToHomepage();
      }
    });
  }

  logout() {
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.setAuthenticationFlags(false);
    this.clearAuthData();
    this.navigateToHomepage();
  }

  private setAuthenticationFlags(val: boolean) {
    this.isAuthenticated = val;
    this.authStatus$.next(val);
  }

  private navigateToHomepage() {
    this.router.navigate(['/']);
  }

  private setTokenTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDatetime: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDatetime.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private generateExpirationDatetime(expiresIn) {
    const now = new Date();
    const expirationDateTime = new Date(now.getTime() + expiresIn * 1000);
    return expirationDateTime;
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');

    return {
      token,
      expiration
    }
  }
}
