import { Component, OnInit, Input } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'validate-event',
  templateUrl: 'validate-event.html'
})
export class ValidateEventComponent implements OnInit {
  loading: any;
  inputValue: string = "oui";


  public eventfee: FormGroup;
  amount2: string = "oui";
  isSubmitted = false;

  // Data passed in by componentProps
  @Input() eventId: string;
  @Input() amount: string;

  constructor(private navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private eventfeeService: ServiceService) { }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  form = new FormGroup({
    montant: new FormControl('', [Validators.required]),
  })


  ngOnInit() {

  }

  message = {
    validate: ' L\'evenement a été validé avec succès',
    TransfertPcn: ' Le Transfert a été bien effectué',
    TransfertAssisteur: ' Le Transfert a été bien effectué',
    TransfertBeneficiare: ' Le Transfert a été bien effectué',
    Cloturer: ' l\'évènement à bien été cloturé',
  };

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  listeInstitut() {
    this.navCtrl.navigateForward('/liste');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Institution ajouté avec succès ',
      //subHeader: '10% of battery remaining',
      buttons: ['OK']
    });
    await alert.present();
  }


  async saveEventValidationFee() {
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
    this.eventfeeService.validate(
      this.amount,
      this.eventId
    ).subscribe(async server_response => {
      await this.loading.dismiss();
      this.presentToast(this.message.validate);
      await this.modalController.dismiss();
    });

  }
}
