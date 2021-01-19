import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-details-pcn',
  templateUrl: './details-pcn.page.html',
  styleUrls: ['./details-pcn.page.scss'],
})
export class DetailsPcnPage implements OnInit {

data: any;
temp1: any = [];
temp2: any = []; 

  constructor(private navCtrl: NavController, private detailspcn: ServiceService, private menuCtrl: MenuController) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.DetailsPCN();
  }
  home() {
    this.navCtrl.navigateForward('/home-results');
  }

  DetailsPCN() {
    this.detailspcn.getDetailsPcn().subscribe(
      resultat => {
        this.temp1 = resultat.detailCotisationPcn;
        console.log(this.temp1);
        // for (let i = 0; i < this.temp1.length; i++) {
        //   let montantTotal;
        //   if (this.temp1.montantCotis) {
            
        //   }
          
        // }
        
        this.data = resultat.detailCotisationPcn;
        // console.log(this.data);
      });
  }
}
