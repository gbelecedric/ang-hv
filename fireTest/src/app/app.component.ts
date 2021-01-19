import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';


declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  constructor() {
  }
  public name = 'Hans-Vernier Begou';
  title = 'My App';
  ngOnInit() {
  }
}
