import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ServiceService } from '../../service.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.html',
  styleUrls: ['./edit-member.scss'],
})
export class EditMemberPage implements OnInit {

  id: any;
  form = {

    nomMembre: new FormControl('', [Validators.required]),
    prenomMembre: new FormControl('', [Validators.required]),
    villeMembre: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    codePostal: new FormControl('', [Validators.required]),
    telMembre: new FormControl('', [Validators.required]),
    dateNaiss: new FormControl('', [Validators.required]),
  }


  deviseComplete: string = '';
  symboleDevise: string = '';

  matcher;
  listVille;
  listPays;
  listRegion;
  role = false;
  user: any;

  member: any = {
    memberDTO: {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      commissioningDate: Date,
      phoneNumber: '',
      zipCode: '',
      street: '',
      cityId: '',
      userId: '',
      occupationId: '',
      memberStatus: '',
      repatriationCountryId: '',
      communityId: '',
      pcnOrganizationId: '',
      email: '',
    },
    countryDTO: {
      id: '',
      name: '',
      isoCode: '',
      isoCode3: '',
      phoneIndex: 0,
      currency: '',
      currencySymbol: '',
    },
    accountDTO: {
      id: '',
      amount: 0,
      label: '',
      currency: '',
    },
  }
  idUser: any;



  constructor(private activateRoute: ActivatedRoute,
    private navCtrl: NavController,
    private service: ServiceService, private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.idUser = this.activateRoute.snapshot.paramMap.get('id');
    const token = JSON.parse(sessionStorage.getItem(environment.VALUES.AUTH_TOKEN));
    this.user = jwt_decode(token);
    this.userControl()
    this.chargerListePays();
  }


  detailMembre(data) {


    this.service.getOneMember(data).subscribe(res => {
      this.member = res;

      console.log(this.member)

    })
  }

  userControl() {
    if (
      this.user.role === environment.VALUES.SUPER_ADMIN
    ) {
      this.detailMembre(this.id)
    } else if (
      this.user.role === environment.VALUES.PCN_ADMIN
    ) {
      this.detailMembre(this.id)
    } else if (
      this.user.role ===
      environment.VALUES.COMMUNITY_ADMIN
    ) {
      this.detailMembre(this.id)
    } else if (
      this.user.role ===
      environment.VALUES.MEMBER
    ) {
      this.detailMembre(this.user.userId)

    }


  }


  updateMember() {
    this.service.updateMember(
      this.member.memberDTO.userId,
      this.member.memberDTO.firstName,
      this.member.memberDTO.lastName,
      this.member.memberDTO.street,
      this.member.memberDTO.phoneNumber,
      this.member.memberDTO.zipCode,
      this.member.memberDTO.cityId,
      this.member.memberDTO.communityId,
      this.member.memberDTO.pcnOrganizationId,
      this.member.memberDTO.birthDate,
      this.member.memberDTO.commissioningDate,
      this.member.memberDTO.email,
      this.member.memberDTO.gender,
      this.member.memberDTO.occupationId,
      this.member.memberDTO.repatriationCountryId,


    ).subscribe(res => {
      this.home();
    })
  }


  chargerListePays() {
    this.service.getAllPay().subscribe(data => {
      this.listPays = data['content'];

    });
  }

  chargerListeRegion(idPays: string, currency: string, currencySymbol: string) {
    this.service.getAllRegionById(idPays).subscribe(data => {
      this.listRegion = data['content'];
      // console.log(this.listRegion);
      this.deviseComplete = currency;
      this.symboleDevise = currencySymbol;
      this.member.memberDTO.cityId = "";
    });
  }

  chargerListeVille(idRegion: string) {
    this.service.getAllVilleById(idRegion).subscribe(data => {
      this.listVille = data['content'];
      // console.log(this.listVille);
    });
  }


  home() {
    this.navCtrl.navigateForward('/home-results');
  }

}
