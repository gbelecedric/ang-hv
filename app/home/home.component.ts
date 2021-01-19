import { Component, OnInit } from '@angular/core';
import {User} from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  userModel = new User('', '12345678', 7798636022, true);

  onSubmit(){
    console.log(this.userModel);
  }

}
