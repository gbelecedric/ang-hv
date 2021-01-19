import { Component } from '@angular/core';
import { ToastController, PopoverController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Events } from 'ionic-angular';
import { NavController, MenuController } from '@ionic/angular';
import { DataPassProvider } from './../../providers/data-pass/data-pass';






/**
 * Generated class for the ActionPopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'action-pop',
  templateUrl: 'action-pop.html'
})
export class ActionPopComponent {

  text: string;
  myId: string;
  value: any;
  idCommunity: any;

  constructor(public toastController: ToastController,
    private service: ServiceService,
    private activateRoute: ActivatedRoute,
    public dataPassService: DataPassProvider,
    private navCtrl: NavController,
    private popoverController: PopoverController
  ) {
    console.log('Hello ActionPopComponent Component');
    this.text = 'Hello World';
    console.log('client');
    // this.myId = this.navParams.get('status');
    this.dataPassService.currentCommunityId.subscribe(
      item => {
        this.myId = item;
        console.log(this.myId);
        console.log(typeof (this.myId));
      }
    );
    console.log(this.myId);
  }

  message = {
    active: ' Votre association a été bien activée',
    Disable: ' Votre association a été bien désactivée',
    edit: ' Votre association a été bien modifiée',
  };

  currentPopover = null;

  activerAsso() {
    this.service.activerAsso(this.myId).subscribe(server_response => {
      this.dismissPopover();
      this.presentToast(this.message.active);
      this.navCtrl.navigateRoot('/home-results');
    });
  }

  desactiverAsso() {
    this.service.desactiverAsso(this.myId).subscribe(server_response => {
      this.dismissPopover();
      this.presentToast(this.message.Disable);
      this.navCtrl.navigateRoot('/home-results');
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  gotoEdit() {
    this.dismissPopover();
    this.navCtrl.navigateForward('/edit-community/' + this.myId);
  }


  async dismissPopover() {
    await this.popoverController.dismiss();
  }

}
