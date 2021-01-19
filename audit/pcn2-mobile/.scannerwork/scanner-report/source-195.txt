import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, MenuController, NavParams } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
// tslint:disable-next-line: max-line-length
  constructor( private modal: ModalController, private evenement: ServiceService,
     private navCtrl: NavController, private menuCtrl: MenuController, private navParams: NavParams) { }

data: any;
dataNotif: any;
eventId: number;
notifId: number;
membreId: any;
errorMessage: any;


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.event(this.eventId);
    this.eventId = this.navParams.data.eventId;
    this.notifId = this.navParams.data.notifId;
    this.membreId = this.evenement.user.membre.id;
    this.activerNotif(this.notifId, this.membreId);
    // console.log(this.notifId);
  }
  close() {
    this.modal.dismiss();
  }

  event(id) {
    this.evenement.getOneEvent(id).subscribe(
      resultat => {
        this.data = resultat;
        // console.log(this.data);
      });
  }
  activerNotif(idNotif, idMembre) {
    this.evenement.getActiverNotification(idNotif, idMembre).subscribe(
      resultat => {
        this.evenement.getNotificationLus();
    });
  }
}
