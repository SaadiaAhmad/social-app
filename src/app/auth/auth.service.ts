import { Injectable } from '@angular/core';
import { User } from './auth-data.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor(private httpClient: HttpClient) { }

  getToken(): string {
    return this.token;
  }

  createUser(user: User) {
    this.httpClient.post('http://localhost:3000/api/user/signup', user)
      .subscribe(data => console.log("Signup: ", data));
  }

  loginUser(user: User) {
    this.httpClient.post<{ message: string, token: string }>('http://localhost:3000/api/user/login', user)
    .subscribe(data => {
      this.token = data.token;
    });
  }
}
