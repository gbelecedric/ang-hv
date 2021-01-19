import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  constructor(private lst: LocalStorage) {
    this.checkToken();
  }
  checkToken() {
    this.lst.getItem('user').subscribe((data) => {
      if (data) {
        this.authenticationState.next(true);
      }
    }, () => {
    });
  }
  login(user) {
    return this.lst.setItem('user', user).subscribe(() => {
      this.authenticationState.next(true);
    }, () => {
      // Error
    });
  }
  logout() {
    return this.lst.removeItem('user').subscribe(() => {
      this.authenticationState.next(false);
      console.log('User removed...');
    }, () => {
    });
  }
  isAuthenticated() {
    return this.authenticationState.value;
  }
}
