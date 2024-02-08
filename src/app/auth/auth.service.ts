import { Injectable } from '@angular/core';
import { User } from './auth-data.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  createUser(user: User) {
    this.httpClient.post('http://localhost:3000/api/user/signup', user)
      .subscribe(data => console.log("Signup: ", data));
  }

  loginUser(user: User) {
    this.httpClient.post('http://localhost:3000/api/user/login', user)
    .subscribe(data => console.log("Login: ", data));
  }
}
