import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, private popover: PopoverController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

  }

  logout() {
    this.popover.dismiss();
    localStorage.clear();
    this.navCtrl.navigateRoot('/');

  }
}
