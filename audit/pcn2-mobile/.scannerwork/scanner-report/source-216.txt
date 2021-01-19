import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'popmenu',
  templateUrl: './popmenu.component.html',
  styleUrls: ['./popmenu.component.scss']
})
export class PopmenuComponent implements OnInit {
  openMenu: Boolean = false;

  constructor(public navCtrl: NavController, private router: Router, private menuCtrl: MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }
  Association() {
    this.router.navigate(['home-results']);
  }
  Propos() {
   this.router.navigate(['about']);
  }
  Parametres() {
    this.router.navigate(['settings']);
  }

}
