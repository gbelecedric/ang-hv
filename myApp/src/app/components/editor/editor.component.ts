import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-dart';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

const THEME = 'ace/theme/dracula';
const LANG = 'ace/mode/dart';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() public code;
  @Input() public img;
  private codeEditor: ace.Ace.Editor;
  private editorBeautify;
  myArr = [];
  index = 0;

  // @ts-ignore
  @ViewChild('codeEditor') private codeEditorElmRef: ElementRef;
  constructor() { }

  ngOnInit() {
    // console.log(this.img);
    this.myArr.push(this.img);
    this.initEditor(this.code);
  }

  private initEditor(val) {
    ace.require('ace/ext/language_tools');
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true);
    this.editorBeautify = ace.require('ace/ext/beautify');
    this.codeEditor.setValue(val);
    this.codeEditor.setReadOnly(true);
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
  sanitize(url: string) {
    return JSON.parse(url);
  }
}
