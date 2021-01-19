import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Assisteur } from 'src/app/service.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'page-modification-assisteur',
  templateUrl: './modification-assisteur.html',
  styleUrls: ['./modification-assisteur.scss'],

})

export class ModificationAssisteurPage implements OnInit {

  public assisteur: FormGroup;

  Assisteur: any = new Assisteur();

  isSubmitted = false;

  id: any;


  constructor(private navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private activateRoute: ActivatedRoute,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder, private dialogs: Dialogs,
    private assisService: ServiceService) {
      this.activateRoute.params.subscribe(param => this.id = param.e_id);

     }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.assisteur = this.formBuilder.group({
      'nomAssis': ['', Validators.required],
      'telAssis': ['', Validators.required],
      'adressAssis': ['', Validators.required],
      'email': ['', Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required],
    });

    this.getOneAssist()
  }


  listeAssiteur() {
    this.navCtrl.navigateForward('/liste-assisteur');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
    message: 'Modification effectuée ',
    //subHeader: '10% of battery remaining',
    buttons: ['OK']
   });
   await alert.present(); 
}

getOneAssist() {
  this.assisService.getOneAssist(this.id).subscribe(res => {

    this.Assisteur = res;
  });
}

  saveAssiteur() {
    if (!this.assisteur.valid) {
      this.isSubmitted = true
    } else {
      this.assisService.saveAssist(
        this.Assisteur.name,
        this.Assisteur.phoneNumber,
        this.Assisteur.street,
        this.Assisteur.email,
      ).subscribe(res => {
        // console.log(res);
        this.presentAlert()
        this.navCtrl.navigateForward('/liste-assisteur');

      }, error => {
        console.log(error);
      });
    }
  }
}
