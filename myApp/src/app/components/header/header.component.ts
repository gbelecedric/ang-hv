import { Component, OnInit } from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {User} from '../../_classes/user';
import {HttpClient} from '@angular/common/http';
import {Stack} from '../../_classes/stack';
import { environment } from '../../../environments/environment';
import {Cat} from '../../_classes/cat';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';

declare var $: any;
declare var Custombox: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private lst: LocalStorage, private http: HttpClient, private router: Router, private route: ActivatedRoute, private auth: AuthenticationService) { }
  user = new User('', '', '', '', '', false, false);
  stack: unknown = new Stack('', '', 0);
  private cat: any;
  catForm = {
    stackId: '',
    cat: []
  };
  ngOnInit() {
    this.initUser();
    this.initStack();
    $('input').tagsinput({
    });
  }
  initUser() {
    // @ts-ignore
    this.lst.getItem('user').subscribe<User>((res) => {
      this.user = res;
    }, (err) => {
    });
  }
  initStack() {
   // @ts-ignore
    this.stack = this.getStack();
  }
  getStack() {
    // @ts-ignore
    this.http.get<Stack>(environment.url + '/api/v1/stacks').subscribe((response) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < response.length; i++) {
        // @ts-ignore
        this.http.get<Cat>(environment.url + '/api/v1/cats/' + response[i].id).subscribe((respi) => {
          response[i].cats = this.decomp(respi, respi.length, 10);
        }, (erri) => {
        });
      }
      this.lst.setItem('stack', response).subscribe((resi2) => {
      }, (erri) => {
      });
      this.stack = response;
    }, (err) => {
      this.lst.getItem('stack').subscribe((resi3) => {
        this.stack = resi3;
      }, (erri3) => {
      });
    });
  }
  decomp(resp, respL, limiting) {
    const nbArr = Math.ceil(((respL - 1)  / limiting));
    let littleArr: Array<Cat>;
    littleArr = [];
    const arrItem = [];
    for (let i = 0; i < respL; i++) {
      littleArr.push(resp[i]);
    }
    for (let i = 0; i < nbArr; i++) {
      if (littleArr.length > 0) {
        if (littleArr.length < limiting ) {
          arrItem[i] = littleArr;
        }
        arrItem[i] = littleArr.splice(0, limiting);
      }
    }
    return arrItem;
  }
  my() {
    // tslint:disable-next-line:prefer-const
    let modal = new Custombox.modal({
      content: {
        target: '#custom-modal',
        effect: 'contentscale'
      },
      overlay: {
        color: '#36404a'
      }
    });
    // Open
    modal.open();
  }
  onSubmit() {
    this.catForm.cat = $('input').tagsinput('items');
    const myArr = this.catForm.cat[1];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < myArr.length; i++) {
      // @ts-ignore
      this.http.post(environment.url + '/api/v1/cat/' + this.catForm.stackId, {name: myArr[i]}).subscribe((res) => {
        this.initStack();
      }, (err) => {
      });
    }
  }
  go(obj) {
    this.router.navigate(['members', 'category', obj.id]);
  }

  logout() {
    this.auth.logout();
  }
}
