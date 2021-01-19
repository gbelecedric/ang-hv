import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'page-liste-institut-financiere',
  templateUrl: './liste.html',
  styleUrls: ['./liste.scss'],

})

export class ListePage implements OnInit {

  listdata;
  idAsso: any;
  loading: any;
  info = '';
  listdataLength;


  constructor(private navCtrl: NavController,
    private institutService: ServiceService,
    public loadingController:LoadingController,
        private menuCtrl: MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    
    this.getListeInstitut()

  }

  async getListeInstitut() {

    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
        
    this.institutService.getAllInstitution().subscribe(async res => {
      this.info = "Il n'y aucune institution";

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

  ajoutinstitut() {
    this.navCtrl.navigateRoot('ajout-institut-financiere');
  }
  

  home() {
    this.navCtrl.navigateForward('/home-results');
  }

  modifierinstitut(id) {
    this.navCtrl.navigateForward('/modification-institut-financiere/'+ id);
  }
}
