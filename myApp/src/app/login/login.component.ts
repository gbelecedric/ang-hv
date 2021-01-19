import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../_services/authentication.service';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../components/dialog/dialog.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient,
              private authService: AuthenticationService, private dialog: MatDialog) { }
  loginForm: FormGroup;
  stat = false;
  errMsg = 'Email Or Pass does\'nt match!';
  errNet = 'There is network error!';
  msg = '';

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  subForm() {
    this.dialog.open(DialogComponent);
    this.stat = true;
    this.login();
  }
  login() {
    this.http.post(environment.url + '/api/v1/user/login', this.loginForm.value).subscribe((res) => {
      if (res != null) {
        this.authService.login(res);
        this.dialog.closeAll();
        this.msg = '';
        console.log(res);
      } else {
        this.msg = this.errMsg;
        this.stat = false;
        this.dialog.closeAll();
      }
    }, (err) => {
      this.msg = this.errNet;
      this.stat = false;
      this.dialog.closeAll();
    });
  }

}
