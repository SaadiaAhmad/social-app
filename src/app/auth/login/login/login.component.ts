import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { User } from '../../auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading = false;

  constructor(private authService: AuthService) {}

  onLoginClick(form: NgForm) {
    if(form.invalid) return;

    const user: User = {
      email: form.value.email,
      password: form.value.password
    }
    this.authService.loginUser(user);
  }


}
