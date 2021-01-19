import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';





@Component({
  selector: 'page-liste-association',
  templateUrl: './liste-association.html',
  styleUrls: ['./liste-association.scss'],

})

export class ListeAssociationPage implements OnInit {

  listCommunuty;
  idAsso: '';
  user;
  token;
  loading: any;
  info = '';
  listdataLength;


  constructor(private navCtrl: NavController,
    private communityService: ServiceService,
    private menuCtrl: MenuController,
    public loadingController: LoadingController,
    private router: Router) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.info = "Data transfer";

    this.getIsConnected();
    this.getCommunityList();

  }

  getIsConnected(): any {
    this.token = JSON.parse(sessionStorage.getItem('id_token'));
    return jwt_decode(this.token);
  }

  async getCommunityList() {
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();

    this.user = this.getIsConnected();
    if (this.user.role = environment.VALUES.COMMUNITY_ADMIN) {
      this.communityService.getCommunityList().subscribe(async res => {
        this.info = "Il n'y a aucune association";

        await this.loading.dismiss();

        this.listCommunuty = res['content'];
        this.listdataLength = res
        this.listdataLength = this.listdataLength.totalElements


        //console.log(this.listCommunuty);
      }, errr => {
        this.loading.dismiss();
        this.info = 'Aucune données disponible';
  
      });
    }
  }

  addcommunity() {
    this.navCtrl.navigateRoot('add-community');
  }


  home() {
    this.navCtrl.navigateForward('/home-results');
  }
}