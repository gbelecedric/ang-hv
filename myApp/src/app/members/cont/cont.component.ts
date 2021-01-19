import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Contenue} from '../../_classes/contenue';
import {environment} from '../../../environments/environment';
declare var $: any;
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-dart';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

const THEME = 'ace/theme/dracula';
const LANG = 'ace/mode/dart';

@Component({
  selector: 'app-cont',
  templateUrl: './cont.component.html',
  styleUrls: ['./cont.component.scss']
})
export class ContComponent implements OnInit {
  private codeEditor: ace.Ace.Editor;
  // @ts-ignore
  @ViewChild('dropzone') myDrop: ElementRef;
  // @ts-ignore
  @ViewChild('codeEditor') private codeEditorElmRef: ElementRef;
  constructor(private lst: LocalStorage, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
  cont = new Contenue('', '', '',  0);
  idUser;
  index = 0;
  title;

  posting = false;
  myContArr = [];
  ngOnInit() {
    this.getCont();
  }

  getCont() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(param.get('id'));
      this.http.get<Contenue>(environment.url + '/api/v1/contenue/' + id).subscribe((res) => {
        this.cont = res;
        this.title = res.title;
        this.initEditor(res.code);
      }, (err) => {
        this.toastErr('Un problème avec la connexion', 'Ooups', 4000);
      });
    });
  }


  onContFilesAdded(files: File[]) {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        this.myContArr.push(content);
      };
      reader.readAsDataURL(file);
    });
  }
  onContFilesRejected(files: File[]) {
    this.toastErr('Not png | jpg | gif', 'Savage upload!', 4000);
  }
  onContSubmit() {
    if (this.myContArr.length > 0) {
      this.cont.photo_url = JSON.stringify(this.myContArr);
    }
    this.posting = true;
    this.cont.code = this.getContent();
    this.http.put(environment.url + '/api/v1/contenue/' + this.cont.id , this.cont).subscribe((res) => {
      this.getCont();
      this.toast('' + this.cont.title + ' a été modifié avec succès', 'Bien!', 4000);
      this.posting = false;
    }, (err) => {
      this.posting = false;
      this.toastErr('Un problème avec la connexion', 'Ooups', 7000);
    });
  }


  // INITIALISATION EDITOR
  handleChange($event) {
    console.log('ngModelChange', $event);
  }
  initEditor(val) {
    ace.require('ace/ext/language_tools');
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true);
    this.codeEditor.setValue(val);
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




  resDrop() {
    // @ts-ignore
    this.myDrop.reset();
    this.myContArr = [];
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
}
