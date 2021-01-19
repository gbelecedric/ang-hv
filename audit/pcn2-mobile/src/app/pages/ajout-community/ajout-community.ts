import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ServiceService } from './../../service.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { Slides } from 'ionic-angular';
import { ISO8601_DATE_REGEX } from '@angular/common/src/i18n/format_date';
import * as moment from 'moment';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-ajout-community',
  templateUrl: './ajout-community.html',
  styleUrls: ['./ajout-community.scss'],
})
export class AjoutCommunityPage implements OnInit {

  data: any;
  idUser: any;
  memberDetails;
  choix = 1;
  nomAssociation = new FormControl('', [Validators.required]);
  dateAsso = new FormControl('', [Validators.required]);
  objetAssociation = new FormControl('', [Validators.required]);
  telAsso = new FormControl('', [Validators.required]);
  emailAsso = new FormControl('', [Validators.required]);
  ouvert = new FormControl('', []);
  pays = new FormControl('', []);
  ville = new FormControl('', []);
  region = new FormControl('', []);
  adresseAsso = new FormControl('', [Validators.required]);
  condition = new FormControl('', []);
  codePostalAsso = new FormControl('', [Validators.required]);
  montantAde = new FormControl('20000', [Validators.required]);
  datePayAde = new FormControl('', [Validators.required]);
  soldeMinAsso = new FormControl('', [Validators.required]);
  soldeMinMembre = new FormControl('', [Validators.required]);
  justificatifPayAde = new FormControl('', [Validators.required]);
  modePay = new FormControl('', [Validators.required]);
  devise = new FormControl('', [Validators.required]);
  coutPrestation = new FormControl('15000', [Validators.required]);
  // matcher = new MyErrorStateMatcher();
  listVille;
  selectedCity = {
    Content: {
      id: '',
      name: '',
      codeRegion: '',
    }
  };
  listPays;
  selectedCountryId = {
    Content: {
      id: '',
      name: '',
      isoCode: '',
      currency: '',
      currencySymbol: '',
    }
  };
  selectedCountry: any = [];
  listRegion;
  selectedDistrictId = {
    Content: {
      id: '',
      name: '',
      isoCode: '',
    }
  };
  selectedDistrict: any = [];

  role = false;
  listeModePaiement: any;
  deviseComplete = '';
  symboleDevise = '';
  swiper: any;

  @ViewChild('slider') slider: Slides;
slidesOptions = { initialSlide: 0 };

  saveAsso() {
    // const notificationMessage = 'Ajout correctement éffectué';
    this.service.saveAsso(
      this.nomAssociation.value,
      this.dateAsso.value,                // ??
      this.objetAssociation.value,
      this.ouvert.value,
      this.condition.value,
      this.telAsso.value,
      this.emailAsso.value,
      this.adresseAsso.value,
      this.codePostalAsso.value,
      this.ville.value,
      this.montantAde.value,
      moment(this.datePayAde.value, moment.ISO_8601),            // ??
      this.justificatifPayAde.value,
      this.modePay.value,
      this.deviseComplete,
      this.coutPrestation.value,
      this.service.isConnected.pcnOrganization,
      Math.random().toString(36).slice(-8)   // auto generated Password

    ).subscribe(res => {
      this.dialogs
        .alert(
          'Enregistrement Réussie',
          'PCN'
        );
      // this.layoutUtilsService.showActionNotification(notificationMessage, MessageType.Delete);
      // this.ktUploadFile.uploadFile(res['id'], 'CREATION_ASSO');
    }, error => {
      console.log(error);
    });
  }

  choisirOuvert(theChoice) {
    this.choix = theChoice;
  }



  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private service: ServiceService,
    private menuCtrl: MenuController,

    private dialogs: Dialogs) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.chargerListePays();
    this.chargerListeModePaiement();
    if (this.service.isConnected.role === environment.VALUES.PCN_ADMIN) {
      this.role = true;
    }

  }
  home() {
    this.navCtrl.navigateForward('/home-results');
  }

  onSelectCountryChange() {
    this.chargerUnPays(this.selectedCountryId);
  }

  onSelectDistrictChange() {
    this.chargerListeVille(this.selectedDistrictId);
  }

  chargerListePays() {
    this.service.getAllPay().subscribe(data => {
      this.listPays = data['content'];
    });
  }

  chargerUnPays(id) {
    this.service.getUnPay(id).subscribe(data => {
      this.selectedCountry = data;
      this.chargerListeRegion(this.selectedCountry.id, this.selectedCountry.currency, this.selectedCountry.currencySymbol);
    });
  }

  chargerListeRegion(id, currency, currencySymbol) {
    this.service.getAllRegionById(id).subscribe(data => {
      this.listRegion = data['content'];
      this.deviseComplete = currency;
      this.symboleDevise = currencySymbol;
    });
  }

  chargerListeVille(id) {
    this.service.getAllVilleById(id).subscribe(data => {
      this.listVille = data['content'];
    });
  }

  chargerListeModePaiement() {
    this.service.getListModePaiement().subscribe(data => {
      this.listeModePaiement = data;
    });
  }

  moveToNext(slides) {
    if (this.swiper) {
      slides.unlockSwipes();
    }
    slides.slideNext();
}

moveToPrev(slides) {
  if (this.swiper) {
    slides.unlockSwipes();
  }
  slides.slidePrev();
}


onIonDrag(slides) {
  this.swiper = slides;
  slides.lockSwipes(true);
}

}
