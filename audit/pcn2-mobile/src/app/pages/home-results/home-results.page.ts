import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController, LoadingController
} from '@ionic/angular';
import * as jwt_decode from 'jwt-decode';
import { environment } from './../../../environments/environment';



// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit {
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

  /* data: any;
   event: any;
   assoc: any;
   dataAsso: any;
   errorMessage: any;
   idAsso: any;
   dataEvent: any;
   membredata: any;
   membreDisable: any;
   dataMembre: any;
   mtPcn: any;
   mtAsso: any;
   mtMembre: any;
   notificationdata: any;
   notification: any = [];
   notificationNonLu: any;
   solde: any;*/

  user: any;
  PendingCommunity;   // list of communities waiting for activation ;
  nbrFamilyLink = 0;                        // connected user family member count
  allFees: any;
  eventPay: any;
  AssoMembers: any;
  AssoMembersEnable: any;
  communityInfo: any = {
    'communityName': '',
    'countEventFeesReceived': 0,
    'countEventFeesSend': 0,
    'countMembersDead': 0,
    'countMembersDisable': 0,
    'countMembersEnable': 0,
    'countMembersNotified': 0,
    'countMembersPending': 0,
    'countSubscriptionMember': 0,
    'totalEventFundReceived': 0,
    'totalEventFundSend': 0,
    'totalSubscriptionMembershipFees': 0
  };
  memberPending: any[];
  eventList: any[];                            // events list and users payements for community dashboard purposes
  dataSource;
  nbTotalAsso = 0;
  nbEvenemen = 0;
  totalMembrepcn = 0;
  totalAssit = 0;
  // itemperpage = this.config.itemperpage;
  // pagesizeoptions = this.config.pagesizeoptions;

  memberDashboard = false;
  communityAdminDashboard = false;
  superAdmainDashboard = false;
  adminPcnDashboard = false;
  communityCount = 0;
  activeCommunityCount = 0;
  disableCommunityCount = 0;
  pendingCommunityCount = 0;
  organisationCotisation = 0;
  accountHistory;
  accountDisplayedColumn: string[] = ['position', 'denomination', 'pays', 'coutprestation'];
  displayedColumns: string[] = ['position', 'denomination', 'pays', 'coutprestation'];


  token = '';
  currentAssoId = '';
  loading: any;
  listdataLength;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public modalController: ModalController,
    private service: ServiceService,
    public loadingController: LoadingController,

  ) {

  }


  ngOnInit() {
    /* this.idAsso = this.service.user.membre.association.id;
     this.dataMembre = this.service.user.membre.id;
     this.membredata = this.service.user;
     this.TotalMembreAssociation(this.idAsso);
     this.TotalEvenementAssociation(this.idAsso);
     this.TotalMembreDisable(this.idAsso);
     this.MontantTotalCotisationAsso(this.idAsso);
     this.MontantTotalCotisationMembre(this.dataMembre);
     this.NbNotification();
     this.TotalMembre();
     this.TotalEvenement();
     this.TotalAssociation();
     this.MontantTotalCotisationPcn();
     this.detailsSoldeCompteMembre(this.dataMembre);
     // console.log(this.service.user);*/
    this.getIsConnected();
    this.user = this.getIsConnected();
    this.currentAssoId = this.user.community;
    this.dashboardControl();

  }

  getIsConnected(): any {
    this.token = JSON.parse(sessionStorage.getItem('id_token'));
    return jwt_decode(this.token);
  }



  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
  }

  detailsMembre() {
    this.navCtrl.navigateRoot('details-membre');
  }
  Listeassociation() {
    this.navCtrl.navigateRoot('liste-association');
  }

  Listemembre() {
    this.navCtrl.navigateRoot('liste-membre');
  }


  Listeinstitut() {
    this.navCtrl.navigateRoot('liste');
  }

  ajoutAsso() {
    this.navCtrl.navigateRoot('ajout-community');
  }


  listeassisteur() {
    this.navCtrl.navigateRoot('liste-assisteur');
  }

  detailsPCN() {
    this.navCtrl.navigateRoot('details-pcn');
  }

  async dashboardControl() {
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();

    // decrypte token ;
    this.token = JSON.parse(sessionStorage.getItem(environment.VALUES.AUTH_TOKEN));
    this.user = jwt_decode(this.token);
    switch (this.user.role) {

      case environment.VALUES.COMMUNITY_ADMIN: {
        this.communityAdminDashboard = true;

        this.service.getCommunityReport(this.user.community).subscribe(res => { this.communityInfo = res; });
        this.service.getCommuntyMembers(this.user.community, environment.PROPERTY.MEMBER_STATUT.PENDING).subscribe(async res => {
          this.memberPending = res['content'];
          await this.loading.dismiss();

        });

        break;
      }
      case environment.VALUES.MEMBER: {
        this.memberDashboard = true;
        this.service.getAccountHistory(this.user.member).subscribe(res => {
          this.accountHistory = res['content'];
          this.eventPay = this.accountHistory.length;
          this.accountHistory.data.forEach(element => {
            this.allFees += element['amount'];
          });
        });

        this.service.familyLink(this.user.member).subscribe(async res => { this.nbrFamilyLink = res['content'].length;
        await this.loading.dismiss();

      });
        break;
      }
      default: {
        this.adminPcnDashboard = true;
        this.service.communityCount('').subscribe(res => { this.communityCount = res.nbr; });
        this.service.communityCount(environment.VALUES.COMMUNITY_STATUTS.ENABLE).subscribe(res => {
          this.activeCommunityCount = res.nbr;
        });
        this.service.communityCount(environment.VALUES.COMMUNITY_STATUTS.DISABLE).subscribe(res => {
          this.disableCommunityCount = res.nbr;
        });
        this.service.communityCount(environment.VALUES.COMMUNITY_STATUTS.PENDING).subscribe(res => {
          this.pendingCommunityCount = res.nbr;
        });
        this.service.allCommunityCotisation(this.user.pcnOrganization).subscribe(res => { this.organisationCotisation = res.amount; });
        this.service.getAllCommunityPending(this.user.pcnOrganization).subscribe(async res => {
          this.PendingCommunity = res['content'];
          this.listdataLength = res
          this.listdataLength = this.listdataLength.totalElements
          await this.loading.dismiss();
        });
      }
    }

  }

}
