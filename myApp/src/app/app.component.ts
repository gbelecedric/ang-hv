import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';

declare var $: any;
// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export  class  AppComponent  implements  OnInit {
  title  =  'pwademo';
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    this.initializeApp();
  }
  ngOnInit() {
  }
  initializeApp() {
    this.authenticationService.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['members', 'dashboard']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

}
