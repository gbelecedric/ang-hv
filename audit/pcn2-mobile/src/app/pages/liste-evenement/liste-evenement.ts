import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'page-liste-evenement',
  templateUrl: './liste-evenement.html',
  styleUrls: ['./liste-evenement.scss'],

})

export class ListeEvenementPage implements OnInit {

  data;
  listdata;
  listdataLength;
  idAsso: any;
  loading: any;
  info = '';
  constructor(private navCtrl: NavController,
    private event_service: ServiceService,
    public loadingController: LoadingController,
    private activateRoute: ActivatedRoute,
    private menuCtrl: MenuController) {
    this.activateRoute.params.subscribe(param => this.idAsso = param.a_id);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.info = "Data transfer";
    this.getListeEvent();

  }

  async getListeEvent() {

    this.loading = await this.loadingController.create({
    });
    await this.loading.present();

    this.event_service.getAllEvenement(this.idAsso).subscribe(async res => {


      this.info = "Il n'y a pas d'evenement";

      await this.loading.dismiss();

      this.listdata = res['content'];
      this.listdataLength = res
      this.listdataLength = this.listdataLength.totalElements

    }, errr => {
      this.loading.dismiss();
      this.info = 'Aucune données disponible';
    });
  }

  ajoutevent() {
    this.navCtrl.navigateRoot('ajout-assisteur');
  }

  home() {
    this.navCtrl.navigateForward('/home-results');
  }

  modifierassisteur(id) {
    this.navCtrl.navigateForward('/modification-evenement/' + id);

  }
}
