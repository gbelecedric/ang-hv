import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, MenuController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { PopoverComponent } from '../../components/popover/popover.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  lang: any;
  enableNotifications: any;
  paymentMethod: any;
  currency: any;
  enablePromo: any;
  enableHistory: any;
  data: any;

  languages: any = ['French'];
// tslint:disable-next-line: max-line-length
  constructor(public navCtrl: NavController, private Informer: ServiceService, public popoverController: PopoverController, public menuCtrl: MenuController, private service: ServiceService) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.data = this.service.user;
  }

  editProfile() {
      this.navCtrl.navigateForward('edit-profile');
    // window.location.href = 'localhost:8100/edit-profile';
    }
  modifierPassword() {
      this.navCtrl.navigateForward('security');
    }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
