import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public appPages: Array<Pages>;

  data: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private service: ServiceService,
    private router: Router
  ) {
    this.appPages = [
      {
        title: 'TABLEAU DE BORD',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },

      {
        title: 'ASSOCIATION',
        url: '/liste-association',
        direct: 'forward',
        icon: 'cog',
        role : environment.VALUES.PCN_ADMIN,
      },
      {
        title: 'MEMBRE',
        url: '/liste-membre/:id',
        direct: 'forward',
        icon: 'cog',
        role : environment.VALUES.COMMUNITY_ADMIN,
      },
      {
        title: 'EVENEMENT',
        url: '/liste-evenement/a6340817-33c3-42ac-bfda-605b87c491d2',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      {
        title: 'PARAMETRES',
        url: '/settings',
        direct: 'forward',
        icon: 'cog'
      }
    ];

    this.initializeApp();
  }

  initializeApp() {
    console.log('app init');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (localStorage.getItem('user')) {
        this.router.navigate(['home-results']);
      } else {
        this.router.navigate(['/']);  // return to login page
      }
    }).catch(() => { });
  }

  ngOnInit() {
    this.data = this.service.user;
    // console.log(this.data);
  }
  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    localStorage.clear();
    this.navCtrl.navigateRoot('/');
  }
}
