import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Dialogs } from '@ionic-native/dialogs/ngx';



@Component({
  selector: 'page-ajout-institut-financiere',
  templateUrl: './add.html',
  styleUrls: ['./add.scss'],

})

export class AjoutInstitutPage implements OnInit {

  public institut: FormGroup;

  isSubmitted = false;


  constructor(private navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder, private dialogs: Dialogs,
    private institutService: ServiceService) { }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.institut = this.formBuilder.group({
      'nomInst': ['', Validators.required],
      'NoCompte': ['',Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required],
    });
  }


  listeInstitut() {
    this.navCtrl.navigateForward('/liste');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Institution ajouté avec succès ',
      //subHeader: '10% of battery remaining',
      buttons: ['OK']
    });
    await alert.present();
  }

  saveInstitut() {
    this.isSubmitted = this.institut.valid;
    if (this.isSubmitted) {
      this.institutService.saveInstitut(
        this.institut.get('nomInst').value,
        this.institut.get('NoCompte').value,
      ).subscribe(res => {
        // console.log(res);
        this.presentAlert()
        this.navCtrl.navigateForward('/liste');

      }, error => {
        console.log(error);
      });
    }
  }
}
