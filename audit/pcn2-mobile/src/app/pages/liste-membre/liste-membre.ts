import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'page-liste-membre',
  templateUrl: './liste-membre.html',
  styleUrls: ['./liste-membre.scss'],

})

export class ListeMembrePage implements OnInit {

  listdata;
  assoId = '';
  user;
  token;
  loading: any;
  info = '';
  listdataLength;

  constructor(private navCtrl: NavController,
    private service: ServiceService,
    private menuCtrl: MenuController,
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.info = "Data transfer";

    this.assoId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.assoId);
    this.getIsConnected();
    this.getMemberList();

  }

  getIsConnected(): any {
    this.token = JSON.parse(sessionStorage.getItem('id_token'));
    return jwt_decode(this.token);
  }
  async getMemberList() {
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();

    console.log(this.assoId);
    this.user = this.getIsConnected();
    console.log(this.user);
    if (this.user.role === environment.VALUES.COMMUNITY_ADMIN) {
      this.assoId = this.user.community;
      this.service.getAllCommunityMember(this.assoId).subscribe(async res => {
        this.info = "Il n'y a aucun membre";

        this.listdata = res['content'];

        this.listdataLength = res
        this.listdataLength = this.listdataLength.totalElements
        // console.log(this.listdata);

        await this.loading.dismiss();
      }, errr => {
        this.loading.dismiss();
        this.info = 'Aucune données disponible';
  
      });


    } else if (this.user.role === environment.VALUES.PCN_ADMIN) {
      console.log(this.assoId);
      this.service.getAllCommunityMember(this.assoId).subscribe(async res => {
        this.info = "Il n'y a aucun membre";

        this.listdata = res['content'];
        // console.log(this.listdata);

        await this.loading.dismiss();
      }, errr => {
        this.loading.dismiss();
        this.info = 'Aucune données disponible';
  
      });
    } else if (this.user.role === environment.VALUES.SUPER_ADMIN) {
      console.log(this.assoId);
      this.service.getAllCommunityMember(this.assoId).subscribe(async res => {
        this.info = "Il n'y a aucun membre";

        this.listdata = res['content'];
        // console.log(this.listdata);

        await this.loading.dismiss();
      }, errr => {
        this.loading.dismiss();
        this.info = 'Aucune données disponible';
  
      });
    }

  }
  home() {
    this.navCtrl.navigateForward('/liste-association');
  }

  addMember() {
    this.navCtrl.navigateForward('/add-member');
  }
}
