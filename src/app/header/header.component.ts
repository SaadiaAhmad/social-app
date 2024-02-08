import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isUserAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.getAuthStatusListener().subscribe(isAuthenicated => {
      this.isUserAuthenticated = isAuthenicated;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
