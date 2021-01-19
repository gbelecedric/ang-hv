import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Stack} from '../../_classes/stack';
import {environment} from '../../../environments/environment';
import {Wid} from '../../_classes/wid';
import {isEmpty} from 'rxjs/operators';
// import {JSON} from "sequelize";
declare var $: any;

@Component({
  selector: 'app-wid',
  templateUrl: './wid.component.html',
  styleUrls: ['./wid.component.scss']
})
export class WidComponent implements OnInit {
  // @ts-ignore
  @ViewChild('dropzone') myDrop: ElementRef;

  constructor(private lst: LocalStorage, private http: HttpClient, private router: Router, private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }
  wid = new Wid('', '', '', 0, 0);
  idUser;
  index = 0;
  nom;
  posting = false;
  myArr = [];

  ngOnInit() {
    this.getWid();
    this.initUser();
  }
  getWid() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(param.get('id'));
      this.http.get<Wid>(environment.url + '/api/v1/wid/' + id).subscribe((res) => {
        this.wid = res;
        this.nom = res.name;
      }, (err) => {
        this.toastErr('Un problème avec la connexion', 'Ooups', 4000);
      });
    });
  }
  initUser() {
    this.lst.getItem('user').subscribe((res) => {
      // @ts-ignore
      this.idUser = res.id;
    }, (err) => {
    });
  }
  saniti(url: string) {
    return JSON.parse(url);
  }
  onFilesAdded(files: File[]) {
    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;

        // this content string could be used directly as an image source
        // or be uploaded to a webserver via HTTP request.
        // this.wid.photo_url.push(content);
        this.myArr.push(content);
      };

      // use this for basic text files like .txt or .csv
      // reader.readAsText(file);

      // use this for images
      reader.readAsDataURL(file);
    });
  }
  onFilesRejected(files: File[]) {
    this.toastErr('Not png | jpg | gif', 'Savage upload!', 4000);
  }
  onSubmit() {
    // @ts-ignore
    if (this.myArr.length > 0) {
      this.wid.photo_url = JSON.stringify(this.myArr);
    }
    this.wid.userId = this.idUser;
    this.posting = true;
    this.http.put(environment.url + '/api/v1/wid/' + this.wid.id , this.wid).subscribe((res) => {
      this.getWid();
      this.toast('' + this.wid.name + ' a été modifié avec succès', 'Bien!', 4000);
      this.posting = false;
    }, (err) => {
      this.posting = false;
      this.toastErr('Un problème avec la connexion', 'Ooups', 7000);
    });
  }

  myFunc() {
    this.myArr = [];
    // @ts-ignore
    this.myDrop.reset();
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
