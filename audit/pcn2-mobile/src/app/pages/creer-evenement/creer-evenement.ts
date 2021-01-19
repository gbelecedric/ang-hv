import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';




@Component({
  selector: 'page-creer-evenement',
  templateUrl: './creer-evenement.html',
  styleUrls: ['./creer-evenement.scss'],

})

export class CreerEvenementPage implements OnInit {

  memberId;
  isSubmitted = false;
  member: any;
  listdata;
  private sub: any;
  idAsso;
  motif = new FormControl('', [Validators.required]);
  membre = new FormControl('', [Validators.required]);
  assisteur = new FormControl('', [Validators.required]);
      //date problem
  date = new FormControl('', [Validators.required]);
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

  constructor(private navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private dialogs: Dialogs,
    private eventService: ServiceService) {

  }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.sub = this.activateRoute.params.subscribe(params => {
      this.memberId = params['m_id'];

    });
    this.DetailsMembers(this.memberId);
    this.chargerListeAssisteur();
  }

  back() {
    this.navCtrl.back;
  }


  listeEvenement() {
    this.navCtrl.navigateForward('/liste-evenement');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Evenement crée avec succès ',
      //subHeader: '10% of battery remaining',
      buttons: ['OK']
    });
    await alert.present();
  }

  DetailsMembers(id) {
    this.eventService.getMemberDetails(id).subscribe(async res => {
      this.memberDetails = res;
    });
  }

  chargerListeAssisteur() {
    this.eventService.getAllAssist().subscribe(data => {
      this.listdata = data['content'];
    });
  }

  saveEvenement() {
    this.eventService.saveEvenement(
      this.motif.value,
      this.assisteur.value,
      this.memberId,
      moment(this.date.value, moment.ISO_8601),
    ).subscribe(data => {
      this.presentAlert();
      this.navCtrl.navigateForward('/liste-evenement/' + this.memberDetails.memberDTO.communityId);

    }, error => {
      console.log(error);
    });
  }

}
