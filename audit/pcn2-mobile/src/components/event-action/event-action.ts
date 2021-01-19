import { Component } from '@angular/core';
import { ToastController, LoadingController, PopoverController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Events } from 'ionic-angular';
import { NavController, MenuController } from '@ionic/angular';
import { DataPassProvider } from '../../providers/data-pass/data-pass';
import { ValidateEventComponent } from '../../components/validate-event/validate-event';
import { ModalController } from '@ionic/angular';






/**
 * Generated class for the ActionPopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'event-action',
  templateUrl: 'event-action.html'
})
export class EventActionComponent {
  loading: any;

  text: string;
  value: any;
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

  constructor(public toastController: ToastController,
    private service: ServiceService,
    public popoverController: PopoverController,
    private activateRoute: ActivatedRoute,
    public loadingController:LoadingController,
    public dataPassService: DataPassProvider,
    public modalController: ModalController,
    private navCtrl: NavController,

  ) {
    console.log('Hello ActionPopComponent Component');
    this.text = 'Hello World';
    console.log('client');
    // this.myId = this.navParams.get('status');
    this.dataPassService.currentpassEventObject.subscribe(
      item => {
        this.evenement = item;
      }
    );
  }

  message = {
    validate: ' L\'evenement a été validé avec succès',
    TransfertPcn: ' Le Transfert a été bien effectué',
    TransfertAssisteur: ' Le Transfert a été bien effectué',
    TransfertBeneficiare: ' Le Transfert a été bien effectué',
    Cloturer: ' l\'évènement à bien été cloturé',
  };

  currentPopover = null;


  async presentModal() {
    const modal = await this.modalController.create({
      component: ValidateEventComponent,
      componentProps: {
        'eventId': this.evenement.eventDTO.id,
        'amount': this.evenement.eventDTO.amount,
      }
    });
    return await modal.present();
  }

   async validateEvent() {
    this.dismissPopover();
    this.presentModal();
  }

  async TransfertPcn() {
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
    this.service.transfertCotisationPCN(this.evenement.eventDTO.id).subscribe(async server_response => {
      this.dismissPopover();
      await this.loading.dismiss();
       this.presentToast(this.message.TransfertPcn);
    });
  }

  async TransfertAssisteur() {
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
    this.service.transfertAssistant(this.evenement.eventDTO.id).subscribe(async server_response => {
      this.dismissPopover();
      await this.loading.dismiss();
       this.presentToast(this.message.TransfertAssisteur);
    });
  }

  async TransfertBeneficiaire() {
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
    this.service.transfertToMember(this.evenement.eventDTO.id).subscribe(async server_response => {
      this.dismissPopover();
      await this.loading.dismiss();
       this.presentToast(this.message.TransfertBeneficiare);
    });
  }

  async CloturerEvent() {
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
    this.service.cloturerPrestation(this.evenement.eventDTO.id).subscribe(async server_response => {
      this.dismissPopover();
      await this.loading.dismiss();
       this.presentToast(this.message.Cloturer);
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  async dismissPopover() {
    await this.popoverController.dismiss()
  }

}
