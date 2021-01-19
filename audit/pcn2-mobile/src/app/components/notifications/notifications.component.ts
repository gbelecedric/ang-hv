import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, MenuController, PopoverController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { EventsPage } from 'src/app/pages/events/events.page';
import { Dialogs } from '@ionic-native/dialogs/ngx';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

// tslint:disable-next-line: max-line-length
  constructor(private modalController: ModalController, 
    private notifications: ServiceService, 
    private navCtrl: NavController, 
    private menuCrtl: MenuController,
    private modal: ModalController,
    private popover: PopoverController) { }

idNoticate: any;
notification: any[] = [];
data: any[] = [];
notificationLu: any[] = [];
idAsso:number;
tempNotif: any[] = [];
  tempNotifLu: number[] = [];

  ionViewWillEnter() {
    this.menuCrtl.enable(false);
  }
 
  ngOnInit() {
    this.idNoticate = this.notifications.user.membre.id;
    this.idAsso = this.notifications.user.membre.association.id;
    console.log(this.idAsso);
    console.log(this.idNoticate);

    // this.notifications.getNombreNotification().subscribe(
    //   res => {
    //       this.data = res;
    // this.notifications.getNotificationLus().subscribe( result => {
    //   this.tempNotif = result;
    //       for (let i = 0; i < this.data.length; i++) {
    //         const id = this.data[i].id;
    //         console.log(id);
            
          
    //     });
    //   });



    // liste des notification lu par le membre
    this.notifications.getNotificationLus().subscribe(result => {
      this.tempNotif = result;
      for (let i = 0; i < this.tempNotif.length; i++) {
        if (this.tempNotif[i].membre.id === this.idNoticate) {
          this.tempNotifLu.push(this.tempNotif[i].notification.id);
        } 
      }
      console.log(this.tempNotifLu);
      this.notifications.getNombreNotification().subscribe(
      res => {
          this.data = res;
        for (let i = 0; i < this.data.length; i++) {
          const id = this.data[i];
          for (let j = 0; j < this.tempNotifLu.length; j++) {
            if (id !== this.tempNotifLu[j]) {
              this.notification.push(this.data[i]);
              break;
            }
          }
            console.log(this.notification);
            // console.log(this.notification.length);
        }
        console.log(this.data);
      });
    });




    
  }


  async presentModal(value, idNotif) {
    console.log(this.idNoticate);
    
    this.notifications.notification(idNotif, this.idNoticate).subscribe(res => {
    console.log(this.idNoticate);
    
    // this.Notication();
  });
    const modal = await this.modalController.create({
      component: EventsPage ,
      componentProps: {eventId: value, notifId: idNotif}
    });
    return await modal.present();
  }
  // Notication() {
  //   this.notifications.getNombreNotification().subscribe(
  //     res => {
  //       this.data = res;
  //       this.notifications.getNotificationLus().subscribe(res =>{
  //         this.tempNotif = res;
  //         for (let i = 0; i < this.data.length; i++) {
  //           const id = this.data[i].id;
  //           for (let j = 0; j < this.tempNotif.length; j++) {
  //             if ((id !== this.tempNotif[i].notification.id) && (this.data[i].evenement.membre.id === this.idNoticate)) {
  //               this.notification.push(this.data[i]);
  //             }
  //           }
  //           // if ((this.data[i].evenement.membre.id === this.idNoticate)) {
  //           //   this.notification.push(this.data[i]);
  //           // }
  //         }
  //       });
  //     });
  //     console.log(this.data);
  // }
  close() {
    // this.navCtrl.navigateRoot('home-results');
    this.popover.dismiss();
    window.location.reload();
  }
}
