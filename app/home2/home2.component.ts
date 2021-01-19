import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {forbiddenNameValidator} from '../_validators/userName';
import {passwordValidator} from '../_validators/password';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit {

  constructor(private fb: FormBuilder) { }
  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5), forbiddenNameValidator(/password/)]],
      pass: [''],
      confirmPass: [''],
      adress: this.fb.group({
        city: [''],
        state: [''],
        postCode: ['']
      }),
      email: [''],
      check: [false],
      altAddr: this.fb.array([])
    }, {validator: passwordValidator});

    this.registerForm.get('check').valueChanges.subscribe((val) => {
      const email = this.registerForm.get('email');
      if (val) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }

  subForm(){
    console.log(this.registerForm.value);
  }













  get email() {
    return this.registerForm.get('email');
  }
  get altAddr() {
    return this.registerForm.get('altAddr') as FormArray;
  }
  addAddr() {
    this.altAddr.push(this.fb.control(''));
  }
 /* registerForm = new FormGroup({
    userName: new FormControl(),
    pass: new FormControl(),
    confirmPass: new FormControl(),
    adress: new FormGroup({
      city: new FormControl(),
      state: new FormControl(),
      postCode: new FormControl()
    })
  });*/

  load() {
    this.registerForm.patchValue({
      userName: 'hverby',
      pass: '12345678',
      confirmPass: '12345678'
    });
  }

}
