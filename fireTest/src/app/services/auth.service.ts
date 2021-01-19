import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) { }
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (res) => {
            console.log(res);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (res) => {
            console.log(res);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  signOutUser() {
    firebase.auth().signOut();
  }
  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      // provider.addScope('user_birthday');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          console.log(res);
          resolve(res);
        }, err => {
          console.log(err);
        });
    });
  }
  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          console.log(res);
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }
}
