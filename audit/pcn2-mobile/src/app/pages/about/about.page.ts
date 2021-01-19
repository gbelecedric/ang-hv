import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {


data: any;

  constructor(private service: ServiceService, private menuCtrl: MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.evenement();
  }

  evenement() {
    this.service.getEvent().subscribe(
      resultat => {
        this.data = resultat;
        // console.log(this.data);
      });
  }
}
