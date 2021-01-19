import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';
// import { Toast } from '@ionic-native/toast/ngx';

import { IonicModule } from '@ionic/angular';

import { CreerEvenementPage } from './creer-evenement';

const routes: Routes = [
  {
    path: '',
    component: CreerEvenementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Dialogs,
    // Toast
  ],
  declarations: [CreerEvenementPage]
})
export class CreerEvenementPageModule {}
