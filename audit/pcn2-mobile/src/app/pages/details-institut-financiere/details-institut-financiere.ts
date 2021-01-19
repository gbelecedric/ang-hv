import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { Assisteur } from '../../service.model';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'page-details-institut-financiere',
  templateUrl: './details-institut-financiere.html',
  styleUrls: ['./details-institut-financiere.scss'],

})

export class DetailsInstitutPage implements OnInit {

  assisteur: any = new Assisteur();
  id: any;


  constructor(private navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private dialogs: Dialogs,
    private institutService: ServiceService) { 
      this.activateRoute.params.subscribe(param => this.id = param.a_id);
      console.log(this.id)
    }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.getOneInstitut();
  }


  listeInstitut() {
    this.navCtrl.navigateForward('/liste');
  }

  modifierinstitut(id) {
    this.navCtrl.navigateForward('/modification-institut-financiere/'+ id);
  }


  getOneInstitut() {
    this.institutService.getOneInstitut(this.id).subscribe(res => {

      this.assisteur = res;
    });
  }
}
