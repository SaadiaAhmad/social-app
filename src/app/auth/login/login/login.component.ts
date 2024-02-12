import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { User } from '../../auth-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoading = false;
  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.getAuthStatusListener().subscribe(() => {
      this.isLoading = false;
    });
  }

  onLoginClick(form: NgForm) {
    if(form.invalid) return;

    this.isLoading = true;

    const user: User = {
      email: form.value.email,
      password: form.value.password
    };
    
    this.authService.loginUser(user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
