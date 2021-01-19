import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';


@Component({
  selector: 'page-liste-assisteur',
  templateUrl: './liste-assisteur.html',
  styleUrls: ['./liste-assisteur.scss'],

})

export class ListeAssisteurPage implements OnInit {

  data;
  listdata;
  idAsso: any;
  loading: any;
  info = '';
  listdataLength;


  constructor(private navCtrl: NavController,
    private assisService: ServiceService,
    public loadingController: LoadingController,
    private menuCtrl: MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.info = "Data transfer";

    this.getListeAssis()

  }

  async getListeAssis() {

    this.loading = await this.loadingController.create({
    });
    await this.loading.present();

    this.assisService.getAllAssist().subscribe(async res => {
      this.info = "Il n'y a aucun assisteur";

      await this.loading.dismiss();

      this.listdata = res['content'];
      this.listdataLength = res
      this.listdataLength = this.listdataLength.totalElements
      // console.log(this.listdata);

    }, errr => {
      this.loading.dismiss();
      this.info = 'Aucune données disponible';

    });
  }

  ajoutassisteur() {
    this.navCtrl.navigateRoot('ajout-assisteur');
  }

  home() {
    this.navCtrl.navigateForward('/home-results');
  }

  modifierassisteur(id) {
    this.navCtrl.navigateForward('/modification-assisteur/' + id);

  }
}
