import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import * as jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PopoverController } from '@ionic/angular';
import { EventActionComponent } from '../../../components/event-action/event-action';
import { IonicPage, NavParams } from 'ionic-angular';
import { DataPassProvider } from '../../../providers/data-pass/data-pass';
import { evenement } from './../.././service.model'

@Component({
  selector: 'app-details-evenement',
  templateUrl: './details-evenement.html',
  styleUrls: ['./details-evenement.scss'],
})
export class DetailsEvenementPage implements OnInit {
  user;
  token;
  idAsso;
  currentPopover = null;
  idEvent = null;

  evenement = {
    assisteurDTO: {
      email: '',
      id: '',
      name: '',
      phoneNumber: '',
      street: '',
    },
    eventDTO: {
      amount: 0,
      assisteurId: '',
      communityId: '',
      description: '',
      eventStatus: '',
      id: '',
      isServed: false,
      isValidatedByAdmin: false,
      isValidatedByAssisteur: false,
      memberId: '',
      passedAwayDate: '',
      pcnOrganizationId: '',
    },
    memberDTO: {
      birthDate: '',
      cityId: '',
      commissioningDate: '',
      communityId: '',
      email: '',
      familyLink: '',
      firstName: '',
      gender: '',
      lastName: '',
      memberStatus: '',
      occupationId: '',
      pcnOrganizationId: '',
      phoneNumber: '',
      repatriationCountryId: '',
      street: '',
      userId: '',
      zipCode: '',
    }
  };



  constructor(private navCtrl: NavController,
    private Eventservice: ServiceService,
    private menuCtrl: MenuController,
    private activateRoute: ActivatedRoute,
    public popoverController: PopoverController,
    public dataPassService: DataPassProvider,
  ) {
    this.activateRoute.params.subscribe(param => this.idEvent = param.e_id);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.user = this.getIsConnected();

    this.getOneEvenement(this.idEvent);


  }

  getIsConnected(): any {
    this.token = JSON.parse(sessionStorage.getItem('id_token'));
    return jwt_decode(this.token);
  }


  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component: EventActionComponent,
      event: ev,
      translucent: true,
      componentProps: {
        'paramID': 123,
        'item': this.idEvent
      }
    });
    this.dataPassService.PassCommunityId(this.idEvent);
    this.dataPassService.PassEventObject(this.evenement);
    this.currentPopover = popover;
    return await popover.present();
  }

  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { this.currentPopover = null; });
    }
  }

  getOneEvenement(id: string) {
    this.Eventservice.getOneEvenement(id).subscribe(res => {
      this.evenement = res;
      this.idAsso = res.memberDTO.communityId;
    });
  }

  home() {
    this.navCtrl.navigateForward('/liste-evenement/' + this.idAsso);
  }


}
