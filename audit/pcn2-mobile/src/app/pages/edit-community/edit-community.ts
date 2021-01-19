import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ServiceService } from '../../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-edit-community',
  templateUrl: './edit-community.html',
  styleUrls: ['./edit-community.scss'],
})
export class EditCommunityPage implements OnInit {
  idUser: string;

  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private service: ServiceService,
    private router: Router) {

    this.activatedRoute.params.subscribe(param => this.id = param.a_id);

  }

  readonly = true;
  association: any = {
    communityDTO: {
      name: String,
      communityAim: String,
      open: Boolean,
      openDescription: String,
      status: String,
      phoneNumber: String,
      email: String,
      eventFees: Number,
      creationDate: String,
      accountId: String,
      zipCode: String,
      street: String,
      cityId: String,
      pcnOrganizationId: String,
      communityAdminUserId: String,
    },
    accountDTO: {
      id: String,
      amount: Number,
      label: String,
      currency: String,
    },
    countryDTO: {
      id: String,
      name: String,
      isoCode: String,
      isoCode3: String,
      phoneIndex: Number,
      currency: String,
    },
    districtDTO: {
      id: String,
      name: String,
      countryId: String,
    },
    cityDTO: {
      id: String,
      name: String,
      districtId: String,
    },
    parameterDTO: {
      id: String,
      communityMinAmount: Number,
      memberMinAmount: Number,
      currency: String,
      pcnOrganizationId: String,
    },
    communityId: String,
  };
  id: any;
  form = new FormGroup({
    nomAsso: new FormControl('', [Validators.required]),
    objetAsso: new FormControl('', [Validators.required]),
    telAsso: new FormControl('', [Validators.required]),
    emailAsso: new FormControl('', [Validators.required]),
    ouvert: new FormControl('', []),
    pays: new FormControl('', []),
    ville: new FormControl('', []),
    region: new FormControl('', []),
    adresseAsso: new FormControl('', [Validators.required]),
    condition: new FormControl('', []),
    codePostalAsso: new FormControl('', [Validators.required]),
    //date problem
    datePayAde: new FormControl('', [Validators.required]),
    soldeMinAsso: new FormControl('', [Validators.required]),
    soldeMinMembre: new FormControl('', [Validators.required]),
    idAsso: new FormControl('', [Validators.required])
  })

  matcher;
  listVille;
  selectedCountry: any = []
  listPays;
  selectedCountryId: any = {
    Content: {
      id: '',
      name: '',
      isoCode: '',
      currency: '',
      currencySymbol: '',
    }
  }
  listRegion;
  selectedDistrictId: any = {
    Content: {
      id: '',
      name: '',
      isoCode: '',
    }
  }
  role = false;
  listeModePaiement: any;
  deviseComplete: String = '';
  symboleDevise: String = '';
  modePay: any;
  nomRegion: String;
  nomPays: String;
  namepays: String;
  nameregion: String;
  nameville: String;

  choix = 1;


  ngOnInit() {
    this.idUser = this.activatedRoute.snapshot.paramMap.get('id');

    this.service.getOneAssociation(this.idUser).subscribe(res => {
      this.association = res;
    });
    this.chargerListePays();
  }

  choisirOuvert(theChoice) {
    this.choix = theChoice;
  }


  onSelectCountryChange() {
    this.chargerUnPays(this.association.countryDTO.id);
  }

  onSelectDistrictChange() {
    this.chargerListeVille(this.association.districtDTO.id)
  }

  chargerUnPays(id) {
    this.service.getUnPay(id).subscribe(data => {
      this.selectedCountry = data;
      console.log(this.selectedCountry)
      this.chargerListeRegion(this.selectedCountry.id, this.selectedCountry.currency, this.selectedCountry.currencySymbol)
    });
  }

  edit() {
    this.readonly = false;
  }
  cancel_edit() {
    this.readonly = true;
  }
  editAsso() {
    this.service.editAssociation(
      this.association.communityId,
      this.association.communityDTO.name,
      this.association.communityDTO.communityAim, this.association.communityDTO.open, this.association.communityDTO.openDescription,
      this.association.communityDTO.phoneNumber, this.association.communityDTO.email, this.association.communityDTO.street,
      this.association.communityDTO.zipCode,
      this.association.cityDTO.id,
      this.association.communityDTO.pcnOrganizationId,
    ).subscribe(res => {

    });
  }


  chargerListePays() {
    this.service.getAllPay().subscribe(data => {
      this.listPays = data['content'];

    });
  }

  chargerListeRegion(id, currency, currencySymbol) {
    console.log(id)
    this.service.getAllRegionById(id).subscribe(data => {
      this.listRegion = data['content'];
      this.deviseComplete = currency;
      this.symboleDevise = currencySymbol;
      console.log(this.listRegion);
    });
  }

  chargerListeVille(id) {
    this.service.getAllVilleById(id).subscribe(data => {
      this.listVille = data['content'];
    });
  }

home() {
  this.navCtrl.navigateForward('/home-results');
}

}
