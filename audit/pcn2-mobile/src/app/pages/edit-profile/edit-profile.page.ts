import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, Validators,FormControl } from '@angular/forms';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})


export class EditProfilePage implements OnInit {
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private serviceMember: ServiceService,
    private menuCtrl: MenuController
    ) { }

  data: any;
  errorMessage: any;
  idMembre: any;



 onLoginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required
      ]),
      'tel': new FormControl('', [
        Validators.required
      ]),
      'adresse': new FormControl('', [
        Validators.required
      ]),
      'postal': new FormControl('', [
        Validators.required
      ])
      // 'profession': new FormControl('', [
      //   Validators.required
      // ]),
      // 'ville': new FormControl('', [
      //   Validators.required
      // ])
    });

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    // console.log(this.serviceMember.user.membre.id);
    this.idMembre = this.serviceMember.user.membre.id;
    this.data = this.serviceMember.user;
  }



  async sendData() {

    const emails = this.onLoginForm.get('email').value;
    const tels = this.onLoginForm.get('tel').value;
    const adr = this.onLoginForm.get('adresse').value;
    const codep = this.onLoginForm.get('postal').value;
    // const profes = this.onLoginForm.get('profession').value;
    // const country = this.onLoginForm.get('ville').value;
    // console.log(noms,prenoms);

// tslint:disable-next-line: max-line-length
    this.serviceMember.modify(this.idMembre, emails, tels, adr, codep).subscribe(async res => {
      if (res.errormessage !== 'Sorry, something went wrong') {
          this.navCtrl.navigateRoot('/home-results');

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
      }
    }, error => {
      this.errorMessage = error.error.errormessage;
    });
  }
}
