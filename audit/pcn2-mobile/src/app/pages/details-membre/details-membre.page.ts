import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { ActivatedRoute } from '@angular/router';
import { MemberActionComponent } from './../../../components/member-action/member-action';
import { DataPassProvider } from './../../../providers/data-pass/data-pass';
import { PopoverController } from '@ionic/angular';





@Component({
  selector: 'app-details-membre',
  templateUrl: './details-membre.page.html',
  styleUrls: ['./details-membre.page.scss'],
})
export class DetailsMembrePage implements OnInit {

  data: any;
  idUser: any;
  memberDetails: any = {
    accountDTO: {
      amount: 0,
      currency: '',
      id: '',
      label: '',
    },
    'cityDTO': {
      'districtId': '',
      'id': '',
      'name': ''
    },
    'countryDTO': {
      'currency': '',
      'currencySymbol': '',
      'id': '',
      'isoCode': '',
      'isoCode3': '',
      'name': '',
      'phoneIndex': 0
    },
    'districtDTO': {
      'countryId': '',
      'id': '',
      'name': ''
    },
    'memberDTO': {
      'birthDate': '',
      'cityId': '',
      'commissioningDate': '2020-05-11T09:36:10.519Z',
      'communityId': '',
      'email': '',
      'familyLink': '',
      'firstName': '',
      'gender': '',
      'lastName': '',
      'memberStatus': '',
      'occupationId': '',
      'pcnOrganizationId': '',
      'phoneNumber': '',
      'repatriationCountryId': '',
      'street': '',
      'userId': '',
      'zipCode': ''
    },
    'memberId': ''
  };

  memberId;
  communityId;
  currentPopover = null;
  loading: HTMLIonLoadingElement;

  constructor(private activatedRoute: ActivatedRoute,
    private detailsMembre: ServiceService,
    private navCtrl: NavController,
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
    // this.idUser = this.detailsMembre.user.membre.id;
    this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    this.DetailsMembers(this.idUser);

  }

  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component: MemberActionComponent,
      event: ev,
      translucent: true,
    });
    this.dataPassService.PassMemberId(this.idUser);
    this.dataPassService.PassCommunityId(this.communityId)
    this.currentPopover = popover;
    return await popover.present();
  }

  home() {
    this.navCtrl.navigateForward('/home-results');
  }

  async DetailsMembers(id) {
    /*this.detailsMembre.getDetailsMembre(id).subscribe(
      resultat => {
        this.data = resultat;
        // console.log(this.data);
      });*/
      this.loading = await this.loadingController.create({
      });
      await this.loading.present();
    this.detailsMembre.getMemberDetails(id).subscribe(async res => {
      this.memberDetails = res;
      this.communityId = this.memberDetails.memberDTO.communityId;
      await this.loading.dismiss();
     // console.log(this.memberDetails);
    });

  }
}
