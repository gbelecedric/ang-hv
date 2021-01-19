import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { timer } from 'rxjs';
import { first } from 'rxjs/operators';
import Ping from 'ping.js';
import {HttpClient} from '@angular/common/http';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {User} from '../../_classes/user';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  status = 'ONLINE';
  isConnected = true;
  isTested = true;
  user = new User('', '', '', '', '', true, true);
  // source = timer(1000);
  constructor(private connectionService: ConnectionService, private http: HttpClient, private lst: LocalStorage) {
    const source = timer(1000, 5000);
    source.subscribe(val => {
      this.myPing2();
    });
  }

  ngOnInit() {
    this.initUser();
    this.myPing();
  }
  initUser() {
    this.lst.getItem('user').subscribe((res) => {
      // @ts-ignore
      this.user = res;
    }, (err) => {
    });
  }
  myPing() {
    const p = new Ping();

    p.ping('https://github.com', (err, data) => {
      if (err) {
        this.toastErr('You are offline', 'Hello ' + this.user.name, 4000);
        this.status = 'OFFLINE';
        this.isConnected = false;
      } else {
        this.toast('You are online', 'Hello ' + this.user.name, 4000);
        this.status = 'ONLINE';
        this.isConnected = true;
      }
    });
  }
  myPing2() {
    const p = new Ping();
    p.ping('https://github.com', (err, data) => {
      if (err) {
        this.toastErr('You are online!', 'Ooups ...', 5000);
        this.status = 'OFFLINE';
        this.isConnected = true;
      } else {
        this.status = 'ONLINE';
        this.isConnected = true;
      }
    });
  }
  toast(text, head, durre) {
    $.toast({
      text, // Text that is to be shown in the toast
      heading: head, // Optional heading to be shown on the toast
      icon: 'success', // Type of toast icon
      showHideTransition: 'plain', // fade, slide or plain
      allowToastClose: true, // Boolean value true or false
      hideAfter: durre, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
      // tslint:disable-next-line:max-line-length
      stack: 10, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
      position: 'top-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center
      textAlign: 'left',  // Text alignment i.e. left, right or center
      loader: true,  // Whether to show loader or not. True by default
      loaderBg: '#31ce77',  // Background color of the toast loader
    });
  }
  toastErr(text, head, durre) {
    $.toast({
      text, // Text that is to be shown in the toast
      heading: head, // Optional heading to be shown on the toast
      icon: 'error', // Type of toast icon
      showHideTransition: 'plain', // fade, slide or plain
      allowToastClose: true, // Boolean value true or false
      hideAfter: durre, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
      // tslint:disable-next-line:max-line-length
      stack: 10, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
      position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center
      textAlign: 'left',  // Text alignment i.e. left, right or center
      loader: true,  // Whether to show loader or not. True by default
      loaderBg: '#f34943',  // Background color of the toast loader
    });
  }
}
