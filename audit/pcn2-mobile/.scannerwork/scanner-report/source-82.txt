import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { Assisteur } from './../../service.model';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'page-details-assisteur',
  templateUrl: './details-assisteur.html',
  styleUrls: ['./details-assisteur.scss'],

})

export class DetailsAssisteurPage implements OnInit {

  assisteur: any = new Assisteur();
  id: any;


  constructor(private navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private dialogs: Dialogs,
    private assisService: ServiceService) { 
      this.activateRoute.params.subscribe(param => this.id = param.e_id);
      console.log(this.id)
    }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.getOneAssist();
  }


  listeAssiteur() {
    this.navCtrl.navigateForward('/liste-assisteur');
  }

  modifierassisteur(id) {
    this.navCtrl.navigateForward('/modification-assisteur/'+ id);

  }


  getOneAssist() {
    this.assisService.getOneAssist(this.id).subscribe(res => {

      this.assisteur = res;
    });
  }
}
