import { Component, OnInit } from '@angular/core';
import { NavController, MenuController,LoadingController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import * as jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PopoverController } from '@ionic/angular';
import { ActionPopComponent } from './../../../components/action-pop/action-pop';
import { IonicPage, NavParams } from 'ionic-angular';
import { DataPassProvider } from './../../../providers/data-pass/data-pass';




export enum SearchType {
  all = '',
  Actif = 'ENABLE',
  Désactivé = 'DISABLE',
  'En attente' = 'PENDING',
  Mort = 'DEAD',
  'A notifier ' = 'NOTIFIED',
  Désabonné = 'UNSUBSCRIBE',
}

export interface CotisEvent {
  id: number;
  libelleEvent: string;
  dateEvent: any;
  montantCotis: any;
}

@Component({
  selector: 'app-details-asso',
  templateUrl: './details-asso.page.html',
  styleUrls: ['./details-asso.page.scss'],
})
export class DetailsAssoPage implements OnInit {

  data: any;
  idAsso: any;
  transfertCotis: any = [];
  evenement: any = [];
  cotisEvent: CotisEvent[] = [];
  user;
  token;
  assoId = '';
  listdata;
  currentPopover = null;
  idUser: any;
  detailsCommunity = {
    communityId: '',
    communityDTO: {
      name: '',
      communityAim: '',
      open: true,
      openDescription: '',
      status: '',
      phoneNumber: '+',
      email: '',
      eventFees: 0,
      accountId: '',
      zipCode: '',
      street: '',
      cityId: '',
      pcnOrganizationId: '',
      communityAdminUserId: ''
    },
    accountDTO: {
      id: '',
      label: '',
      currency: ''
    },
    countryDTO: {
      id: '',
      name: '',
      isoCode: '',
      isoCode3: '',
      phoneIndex: 0,
      currency: '',
      currencySymbol: ''
    },
    districtDTO: {
      id: '',
      name: '',
      countryId: ''
    },
    cityDTO: {
      id: '',
      name: '',
      districtId: ''
    },
    parameterDTO: {
      id: '',
      communityMinAmount: 0,
      memberMinAmount: 0,
      currency: '',
      pcnOrganizationId: ''
    }
  };
  myId = null;
  loading: any;



  constructor(private navCtrl: NavController,
    private service: ServiceService,
    private menuCtrl: MenuController,
    private activateRoute: ActivatedRoute,
    public popoverController: PopoverController,
    public dataPassService: DataPassProvider,
    public loadingController: LoadingController,

  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.myId = this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.myId);
    // this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.idUser);
    this.user = this.getIsConnected();
    this.getCommunityDetail(this.myId);
    // this.getCommunityDetails();
    /* if (this.user.role = environment.VALUES.COMMUNITY_ADMIN) {
       this.assoId = this.user.community;
       this.getCommunityDetail(this.assoId);
     } else if ((this.user.role = environment.VALUES.SUPER_ADMIN) || (this.user.role = environment.VALUES.PCN_ADMIN)) {
       console.log(this.myId);
       this.getCommunityDetail(this.myId);
     }*/

  }
  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component: ActionPopComponent,
      event: ev,
      translucent: true,
      componentProps: {
        'paramID': 123,
        'item': this.myId
      }
    });
    console.log(this.myId);
    this.dataPassService.PassCommunityId(this.myId);

    this.currentPopover = popover;
    return await popover.present();
  }



  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

  getIsConnected(): any {
    this.token = JSON.parse(sessionStorage.getItem('id_token'));
    return jwt_decode(this.token);
  }

  async getCommunityDetail(id: string) {
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
    this.service.getCommunityDetails(id).subscribe(async res => {
      this.detailsCommunity = res;
      await this.loading.dismiss();

      //console.log(this.detailsCommunity);
    });
  }
  // searchbar.addEventListener('ionInput', handleInput);


  handleInput(event) {
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.listdata.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }

  home() {
    this.navCtrl.navigateForward('/liste-association');
  }


}
