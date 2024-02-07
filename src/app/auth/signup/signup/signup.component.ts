import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../../auth-data.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSignupClick(form: NgForm) {
    if(form.invalid) return;
    
    const user: User = {
      email: form.value.email,
      password: form.value.password
    }
    this.authService.createUser(user);
  }
}
