import { Injectable } from '@angular/core';
import { User } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const USER_API_BASE_PATH = 'http://localhost:3000/api/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private isAuthenticated = false;
  private authStatus$ = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  autoAuthenticateUser() {
    const storedAuthData = this.getAuthData();

    if (storedAuthData.token && storedAuthData.expiration) {
      const currentDate = new Date();
      const expirationDatetime = new Date(storedAuthData.expiration);
      const isTokenExpired =  expirationDatetime < currentDate;
      if(!isTokenExpired) {
        const expiresIn = expirationDatetime.getTime() - currentDate.getTime();
        this.token = storedAuthData.token;
        this.userId = storedAuthData.userId;
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

  getUserId() {
    return this.userId;
  }

  createUser(user: User) {
    this.httpClient.post(`${USER_API_BASE_PATH}/signup`, user)
      .subscribe(
        data => this.navigateToLoginPage(),
        error => this.authStatus$.next(false)
      );
  }

  loginUser(user: User) {
    this.httpClient.post<{ message: string, token: string, expiresIn: number, userId: string }>(`${USER_API_BASE_PATH}/login`, user)
    .subscribe(
      data => {
        this.token = data.token;
        if(this.token) {
          this.userId = data.userId;
          this.setAuthenticationFlags(true);
          this.setTokenTimer(data.expiresIn);
          this.saveAuthData(this.token, this.generateExpirationDatetime(data.expiresIn), this.userId);
          this.navigateToHomepage();
        }
      },
      error => this.authStatus$.next(false)
    );
  }

  logout() {
    this.token = null;
    this.userId = null;
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

  private navigateToLoginPage() {
    this.router.navigate(['/login']);
  }

  private setTokenTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDatetime: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDatetime.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private generateExpirationDatetime(expiresIn) {
    const now = new Date();
    const expirationDateTime = new Date(now.getTime() + expiresIn * 1000);
    return expirationDateTime;
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    return {
      token,
      expiration,
      userId
    }
  }
}
