import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController, Platform } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { environment } from './../../../environments/environment'
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  scheduled = [];
  dataMembre: any;
  Mail: any = [];
  message: any;
  etat: any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private plt: Platform,
    private localNotifications: LocalNotifications
  ) {

    //     this.plt.ready().then(() => {
    //       this.localNotifications.on('click').subscribe(res => {
    //         console.log('click', res);
    //         let msg = res.data ? res.data.mydata : '';
    //         this.showAlert(res.title, res.text, msg);
    //       });
    //     });

    //     this.plt.ready().then(() => {
    //       this.localNotifications.on('trigger').subscribe(res => {
    //         console.log('click', res);
    //         let msg = res.data ? res.data.mydata : '';
    //         this.showAlert(res.title, res.text, msg);
    //       });
    //     });
  }
  errorMessage: any;

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      'emailMembre': [null, Validators.compose([
        Validators.required
      ])],
      'passwordMembre': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Mot de passe oublié?',
      message: 'Entrez votre email',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          id: 'emails'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            // this.message = ' email invalide';
          }
        }, {
          text: 'Confirmer',
          handler: async data => {
            const email = data.email;
            this.service.getMembre().subscribe(
              async resultat => {
                this.dataMembre = resultat;
                for (let i = 0; i < this.dataMembre.length; i++) {
                  if (this.dataMembre[i].emailMembre === email) {
                    const loader = await this.loadingCtrl.create({
                      duration: 2000
                    });

                    loader.present();
                    loader.onWillDismiss().then(async l => {
                      const toast = await this.toastCtrl.create({
                        showCloseButton: true,
                        message: 'De nouveaux parametres sont envoyés  à votre email.',
                        duration: 3000,
                        position: 'bottom'
                      });
                      toast.present();
                      // this.navCtrl.navigateRoot('home-results');
                    });
                  } else {
                    const loader = await this.loadingCtrl.create({
                      duration: 2000
                    });

                    loader.present();
                    loader.onWillDismiss().then(async l => {
                      const toast = await this.toastCtrl.create({
                        showCloseButton: true,
                        message: 'De nouveaux parametres sont envoyés  à votre email.',
                        duration: 3000,
                        position: 'bottom'
                      });
                      toast.present();
                      // this.navCtrl.navigateRoot('home-results');
                    });
                  }

                }
                // console.log(this.dataMembre);
                // console.log(this.Mail);
              });
          }
        }
      ]
    });
    await alert.present();
  }
  getMembre() {

  }

  connectUser() {

    const emails = this.onLoginForm.get('emailMembre').value;
    const passwords = this.onLoginForm.get('passwordMembre').value;

    // console.log(emails);
    // console.log(passwords);


    this.service.pcnlogin(emails, passwords).subscribe(res => {
      if (res.errormessage !== 'Wrong username or password') {
        sessionStorage.setItem(
          environment.VALUES.AUTH_TOKEN,
          JSON.stringify(res.id_token)
        );
        // decrypte token 
        let token = JSON.parse(JSON.stringify(res.id_token));
        var user = jwt_decode(token);
        if (
          user.role !== null
        ) {
          this.navCtrl.navigateRoot(environment.ROUTES.HOME);
          //window.location.reload();
        } else {
          this.etat = 'Wrong username or password';
        }
      }
    }, error => {
      this.errorMessage = 'Identifiants incorrects';
    });


    // this.navCtrl.navigateRoot('/home-results');
  }

  // scheduleNotification() {
  //   this.localNotifications.schedule({
  //     id: 1,
  //     title: 'Notifications',
  //     text: 'Nouveau evenement survenu',
  //     data: { mydata: 'home-results'},
  //     trigger: { at: new Date(new Date().getTime() + 3600)}
  //   });
  // }

  // showAlert(header, sub, msg) {
  //   this.alertCtrl.create({
  //     header: header,
  //     subHeader: sub,
  //     message: msg,
  //     buttons: ['ok']
  //   }).then(alert => alert.present());
  // }
  // getAll() {
  //   this.localNotifications.getAll().then(res => {
  //     this.scheduled = res;
  //   });
  // }
}
