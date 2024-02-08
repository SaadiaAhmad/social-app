import { Injectable } from '@angular/core';
import { User } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private authStatus$ = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  getToken(): string {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatus$.asObservable();
  }

  createUser(user: User) {
    this.httpClient.post('http://localhost:3000/api/user/signup', user)
      .subscribe(data => console.log("Signup: ", data));
  }

  loginUser(user: User) {
    this.httpClient.post<{ message: string, token: string }>('http://localhost:3000/api/user/login', user)
    .subscribe(data => {
      this.token = data.token;
      this.authStatus$.next(true);
    });
  }
}
