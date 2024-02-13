import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../auth-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.getAuthStatusListener().subscribe(() => {
      this.isLoading = false;
    });
  }

  onSignupClick(form: NgForm) {
    if(form.invalid) return;
    
    this.isLoading = true;

    const user: User = {
      email: form.value.email,
      password: form.value.password
    };

    this.authService.createUser(user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
