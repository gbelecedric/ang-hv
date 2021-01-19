import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';



@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.html',
  styleUrls: ['./add-member.scss'],
})
export class AddMemberPage implements OnInit {

  today = new Date();
  dictionary: any;
  animal: string;
  name: string;
  funcGlobal;
  member = {
    memberDTO: {
      birthDate: '',
      cityId: '',
      commissioningDate: '',
      communityId: '',
      email: '',
      firstName: '',
      gender: '',
      lastName: '',
      occupationId: '',
      pcnOrganizationId: '',
      phoneNumber: '',
      repatriationCountryId: '',
      street: '',
      zipCode: ''
    },
    paymentDetail: {
      amount: ' ',
      currency: '',
      description: '',
      operationDate: '',
      operationType: '',
      paymentMode: ''
    },
    userDTO: {
      password: '',
      username: ''
    },
    attachmentDTO: {
      attachmentType: '',
      entityIdentifier: '',
      name: ''
    }
  };

  membre: {
    memberDTO: {
      firstName: string;
      lastName: string;
      birthDate: string;
      gender: string;
      commissioningDate: Date;
      phoneNumber: string;
      zipCode: string;
      street: string;
      cityId: string;
      userId: string;
      occupationId: string;
      memberStatus: string;
      repatriationCountryId: string;
      communityId: string;
      pcnOrganizationId: string;
      email: string;
    };
    countryDTO: {
      id: string;
      name: string;
      isoCode: string;
      isoCode3: string;
      phoneIndex: number;
      currency: string;
      currencySymbol: string;
    };
    accountDTO: {
      id: string;
      amount: number;
      label: string;
      currency: string;
    };
  }
    ;
  addedMembreId: number;
  institu: any;
  data: any;
  listPays: any;
  listLienParente: any;
  listVille;
  profil = 1;
  // private unsubscribe: Subject<any>;
  profession: any;
  assoc: any;
  nomMembreTmp: any;
  choixMembreFamillle = 0;
  nextMembreId: number;

  nomMembre = new FormControl('', [Validators.required]);
  prenomMembre = new FormControl('', [Validators.required, ]);
  dateNaiss = new FormControl('', [Validators.required]);
  lieuNaiss = new FormControl('', [Validators.required, Validators.minLength(1)]);
  emailMembre = new FormControl('', [Validators.required, Validators.email, ]);
  adresse = new FormControl('', [Validators.required]);
  codePostal = new FormControl('', [Validators.required]);
  nomMembreFamille = new FormControl('', [Validators.required]);
  prenomMembreFamille = new FormControl('', [Validators.required]);
  membreFamilleId = new FormControl('', [Validators.required]);
  chefFamilleId = new FormControl('', [Validators.required]);
  lienParente = new FormControl('', [Validators.required]);
  membreProfession = new FormControl('', [Validators.required]);
  telMembre = new FormControl('', [Validators.required]);
  associationMembre = new FormControl('', [Validators.required]);
  villeMembre = new FormControl('', [Validators.required]);
  paysRappartr = new FormControl('', [Validators.required]);
  paysResidence = new FormControl('', [Validators.required]);
  pwd = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.required]);



  regionMembre = new FormControl('', [Validators.required]);
  membreDeFamille = new FormControl('', [Validators.required]);

  // frais d'adhésion
  datePaiement = new FormControl('', [Validators.required]);
  montantDepot = new FormControl('', [Validators.required]);
  montantAdhesion = new FormControl('', [Validators.required]);
  typePaiment = new FormControl('', [Validators.required]);
  details = new FormControl('', [Validators.required]);
  institus = new FormControl('', [Validators.required]);
  membreId = new FormControl('', [Validators.required]);
  justificatif = new FormControl('', [Validators.required]);
  adminAssoRole = new FormControl('', [Validators.required]);
  modePay = new FormControl('', [Validators.required]);
  currency = new FormControl('', [Validators.required]);
  membreFamille = [];
  membreTab = [];
  membreFamilleTab = [];
  lienParenteOrdonnes = [];
  // matcher = new MyErrorStateMatcher();
  associations: [];
  loading = false;
  role = false;
  admin: any;
  // cFamille: any;
  // mFamille: any;
  listRegion;
  listeModePaiement: any;
  etats: any;
  associationValue: any;
  user: any;
  idAssoParam: any;

  Password = '';
  lenght = 10;

  // familyMember;





  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private service: ServiceService, private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.chargerListeModePaiement();
    this.chargerListePays();
    this.getProfession();
    this.getInstitutionFinanciere();
  }


  chargerListePays() {
    this.service.getAllPay().subscribe(res => {
      const data = res;
      this.listPays = data['content'];
    });
  }

  chargerListeRegion(idPays: string, devisePays: string, paysDevise: string) {
    this.service.getAllRegionById(idPays).subscribe(data => {
      this.listRegion = data['content'];
    });
  }

  chargerListeVille(idRegion: string) {
    this.service.getAllVilleById(idRegion).subscribe(data => {
      this.listVille = data['content'];
    });
  }
  // listes des profiessions
  getProfession() {
    this.service.getProfession().subscribe(res => {
      this.profession = res;
    });
  }

  // institution financière
  getInstitutionFinanciere() {
    this.service.getAllInstitution().subscribe(res => {
      this.institu = res;
    });
  }

  // frais d'adhésion
  saveFraisAdhesion() {
    this.service.saveFraisAdhesion(
      moment(this.datePaiement.value, moment.ISO_8601),
      this.montantAdhesion.value,
      this.details.value,
      this.addedMembreId,
      this.justificatif.value).subscribe(() => {
      this.service.activerAsso(this.addedMembreId);
    });
  }

  chargerListeModePaiement() {
    this.service.getListModePaiement().subscribe(data => {
      this.listeModePaiement = data;
      console.log(this.listeModePaiement);
    });
  }

  adhesionDepot() {
    this.service.saveCotisation(
      null,
      this.nextMembreId,
      moment(this.datePaiement.value, moment.ISO_8601),
      this.montantAdhesion.value,
      this.montantDepot.value,
      this.details.value,
      this.justificatif.value,
      this.modePay.value).subscribe();

    this.service.activerAsso(this.nextMembreId).subscribe(res => {
      this.home();
    });
  }

  home() {
    this.navCtrl.navigateForward('/home-results');
  }

}
