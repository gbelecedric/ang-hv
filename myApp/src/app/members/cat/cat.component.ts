import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Cat} from '../../_classes/cat';
import { environment } from '../../../environments/environment';
import {Stack} from '../../_classes/stack';
import {Wid} from '../../_classes/wid';
import {Contenue} from '../../_classes/contenue';
declare var $: any;
declare var Custombox: any;
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-dart';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import {User} from '../../_classes/user';

const THEME = 'ace/theme/dracula';
const LANG = 'ace/mode/dart';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CatComponent implements OnInit {
  private codeEditor: ace.Ace.Editor;
  private editorBeautify;
  // @ts-ignore
  @ViewChild('dropzone') myDrop: ElementRef;
  // @ts-ignore
  @ViewChild('dropzone2') myDrop2: ElementRef;
  // @ts-ignore
  @ViewChild('codeEditor') private codeEditorElmRef: ElementRef;
  constructor(private lst: LocalStorage, private http: HttpClient, private router: Router, private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }
  stack = new Stack('', '', 0);
  cat = new Cat('', 0);
  wid = new Wid('', '', '', 0, 0);
  cont = new Contenue('', '', '',  0);
  index = 0;
  wids;
  id;
  idUser;
  posting = false;
  nb = 0;
  myArr = [];
  myContArr = [];
  actuCat = new Cat('', 0);
  images: string[] = ['assets/images/ss6.gif', 'assets/images/ss7.gif', 'assets/images/ss9.gif'];

  ngOnInit() {
    this.getStack();
    this.getCat();
    this.getWid();
    this.initUser();
    this.initEditor();
  }
  fi(str) {
    return decodeURI(str.trim());
  }
  initUser() {
    this.lst.getItem('user').subscribe((res) => {
      // @ts-ignore
      this.idUser = res.id;
    }, (err) => {
    });
  }
  getStack() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(param.get('id'));
      this.http.get<Stack>(environment.url + '/api/v1/stack/' + id).subscribe((res) => {
        this.stack = res;
        }, (err) => {
        });
    });
  }
  getCat() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(param.get('id'));
      this.http.get<Cat>(environment.url + '/api/v1/cat/single/' + id).subscribe((res) => {
        this.cat = res;
        }, (err) => {
        });
    });
  }
  getWid() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(param.get('id'));
      this.http.get<Wid>(environment.url + '/api/v1/wids/' + id).subscribe((res) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < res.length; i++) {
          this.getCont(res[i].id).subscribe((resi) => {
            res[i].contenues = resi;
          }, (erri) => {
          });
          this.getUsr(res[i].userId).subscribe((resi) => {
            res[i].user = resi;
          }, (erri) => {
          });
        }
        this.wids = res;
        console.log(res);
      }, (err) => {
      });
    });
  }
  getCont(id) {
    return this.http.get<Wid>(environment.url + '/api/v1/contenues/' + id);
  }
  getUsr(id) {
    return this.http.get<User>(environment.url + '/api/v1/user/' + id);
  }
  openCatModal() {
    // tslint:disable-next-line:prefer-const
    let modal = new Custombox.modal({
      content: {
        target: '#custom-modal-wid',
        effect: 'push'
      },
      overlay: {
        color: '#36404a'
      }
    });
    // Open
    modal.open();
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
        this.wid.photo_url = JSON.stringify(this.myArr);
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
    this.wid.userId = this.idUser;
    this.posting = true;
    this.route.paramMap.subscribe((param: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(param.get('id'));
      this.http.post(environment.url + '/api/v1/wid/' + id , this.wid).subscribe((res) => {
        this.getWid();
        // @ts-ignore
        this.myDrop.reset();
        this.wid = new Wid('', '', '', 0, 0);
        this.toast('' + this.wid.name + ' a été ajouté avec succès', 'Bien!', 4000);
        this.posting = false;
      }, (err) => {
        this.posting = false;
        this.toastErr('Un problème avec la connexion', 'Ooups', 7000);
      });
    });
  }


  // Poste d'un contenue...
  onContFilesAdded(files: File[]) {

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        this.myContArr.push(content);
        this.cont.photo_url = JSON.stringify(this.myContArr);
      };
      reader.readAsDataURL(file);
    });
  }
  onContFilesRejected(files: File[]) {
    console.log(files);
  }
  onContSubmit() {
    this.posting = true;
    this.cont.code = this.getContent();
    this.http.post(environment.url + '/api/v1/contenue/' + this.actuCat.id , this.cont).subscribe((res) => {
      this.toast('' + this.cont.title + ' a été ajouté avec succès', 'Bien!', 4000);
      // @ts-ignore
      this.myDrop2.reset();
      this.cont = new Contenue('', '', '',  0);
      this.posting = false;
      this.getWid();
    }, (err) => {
      this.posting = false;
      this.toastErr('Un problème avec la connexion', 'Ooups', 7000);
    });
  }
  change(obj) {
    this.actuCat = obj;
  }
  // INITIALISATION EDITOR
  handleChange($event) {
    console.log('ngModelChange', $event);
  }
  initEditor() {
    ace.require('ace/ext/language_tools');
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true);
    this.editorBeautify = ace.require('ace/ext/beautify');
  }
  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      // highlightActiveLine: true,
      minLines: 30,
      autoScrollEditorIntoView: false,
      maxLines: Infinity,
    };
    const extraEditorOptions = { enableBasicAutocompletion: true };
    return Object.assign(basicEditorOptions, extraEditorOptions);
  }
  public getContent() {
    if (this.codeEditor) {
      const code = this.codeEditor.getValue();
      return code;
    }
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
  sanitiz(url: string) {
    return JSON.parse(url);
  }
  myFunc() {
    this.myArr = [];
  }
  del(idTab, idBd) {
   if (confirm('Voulez vous effectuer cette action ?')) {
     this.http.delete(environment.url + '/api/v1/wid/' + idBd).subscribe((res) => {
       this.getWid();
     }, (err) => {
       this.toastErr('There was an error', 'Ooops', 4400);
     });
   }
  }
  delCont(obj) {
    if (confirm('Voulez vous effecter cette action ?')) {
      this.http.delete(environment.url + '/api/v1/contenue/' + obj.id).subscribe((res) => {
        this.router.navigate(['members', 'category', this.cat.id]);
        this.getWid();
        this.toast('' + obj.title + ' a été supprimé avec succès', 'Bien!', 4000);
      }, (err) => {
        this.toastErr('There was an error', 'Ooops', 4400);
      });
    }
  }

  go(id: any) {
    this.router.navigate(['members', 'widget', id]);
  }
  upGo(id: any) {
    $('.getMod').modal('hide');
    this.router.navigate(['members', 'contenue', id]);
    $('.getMod').modal('hide');
  }

  resDrop() {
    // @ts-ignore
    this.myDrop2.reset();
    this.myContArr = [];
  }
}
