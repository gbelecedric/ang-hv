import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FundManagerDTO } from 'src/app/service.model';
import { ActivatedRoute } from '@angular/router';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Dialogs } from '@ionic-native/dialogs/ngx';


@Component({
  selector: 'page-modification-institut-financiere',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss'],

})

export class ModificationIntitutPage implements OnInit {

  public institut: FormGroup;

  Institut: any = new FundManagerDTO();

  isSubmitted = false;

  id: any;


  constructor(private navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private activateRoute: ActivatedRoute,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder, private dialogs: Dialogs,
    private institutService: ServiceService) {
      this.activateRoute.params.subscribe(param => this.id = param.a_id);

     }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.institut = this.formBuilder.group({
      'nomInst': ['', Validators.required],
      'accountNumber': ['', Validators.required],
    });

    this.getOneInstitut()
  }


  listeInstitut() {
    this.navCtrl.navigateForward('/liste');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
    message: 'Modification effectuée ',
    //subHeader: '10% of battery remaining',
    buttons: ['OK']
   });
   await alert.present(); 
}

getOneInstitut() {
  this.institutService.getOneInstitut(this.id).subscribe(res => {

    this.Institut = res;
  });
}

  saveInstitut() {
    if (!this.institut.valid) {
      this.isSubmitted = true
    } else {
      this.institutService.saveInstitut(
        this.Institut.name,
        this.Institut.accountNumber,
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
