import { Component } from '@angular/core';
import { ToastController, PopoverController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Events } from 'ionic-angular';
import { NavController, MenuController } from '@ionic/angular';
import { DataPassProvider } from './../../providers/data-pass/data-pass';


/**
 * Generated class for the MemberActionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'member-action',
  templateUrl: 'member-action.html'
})
export class MemberActionComponent {

  text: string;
  currentPopover = null;
  memberId: any;
  communityId: any;
  message = {
    active: ' Le membre a été bien activée',
    Disable: ' Le membre a été bien désactivée',
    edit: ' Le membre a été bien modifiée',
  };


  constructor(
    public toastController: ToastController,
    private service: ServiceService,
    private activateRoute: ActivatedRoute,
    public popoverController: PopoverController,
    public dataPassService: DataPassProvider,
    private navCtrl: NavController,
  ) {
    console.log('Hello MemberActionComponent Component');
    this.text = 'Hello World';

    this.dataPassService.currentMemberId.subscribe(
      item => {
        this.memberId = item;
      }
    );


    this.dataPassService.currentCommunityId.subscribe(
      item => {
        this.communityId = item;
      }
    );
  }


  desactiverMembre() {

    this.service.desactiverMembre(this.memberId).subscribe(res => {
      this.dismissPopover();
      this.presentToast(this.message.Disable);
       this.navCtrl.navigateRoot('/home-results');

    });

  }

  activerMembreDesactiver() {

    this.service.activerMembreDesactiver(this.memberId).subscribe(res => {
      this.dismissPopover();
      this.presentToast(this.message.active);
       this.navCtrl.navigateRoot('/home-results');
    }
    );

  }
  editMember(){
    this.dismissPopover();
    this.navCtrl.navigateForward('/edit-member/' + this.memberId);
  }
  routeEvent() {
   this.dismissPopover();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async dismissPopover() {
      await this.popoverController.dismiss();
  }
}
