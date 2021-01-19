import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuController, NavController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {

  constructor(private serviceMember: ServiceService, private menuCtrl: MenuController, public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) { }

  data: any;
  errorMessage: any;
  idMembre: any;
  message: any;


  onChangeLoginForm = new FormGroup({
    password: new FormControl('', [
      Validators.required, Validators.minLength(4)
    ]),
    passwordconfirm: new FormControl('', [
      Validators.required, Validators.minLength(4)
    ])
  });

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.idMembre = this.serviceMember.user.membre.id;
    this.data = this.serviceMember.user;
  }



  async sendData() {

    const passwords = this.onChangeLoginForm.get('password').value;
    const passwordconfirms = this.onChangeLoginForm.get('passwordconfirm').value;
    console.log(passwords, passwordconfirms);

    if (passwords === passwordconfirms) {
    // tslint:disable-next-line: max-line-length
        this.serviceMember.modifyPassword(this.idMembre , passwords).subscribe(async res => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                cssClass: 'bg-profile',
                message: 'Your Data was Edited!',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
              this.navCtrl.navigateRoot('/');
            });
          });

    } else {
        this.message = ' Les deux mots de passe ne concordent pas' ;
        // console.log("Les deux mots de passe ne concordent pas");
    }
  }
}
