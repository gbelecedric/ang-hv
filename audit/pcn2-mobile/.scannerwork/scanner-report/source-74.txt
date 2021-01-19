import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';

import { IonicModule } from '@ionic/angular';

import { AjoutInstitutPage } from './add';

const routes: Routes = [
  {
    path: '',
    component: AjoutInstitutPage
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
  ],
  declarations: [AjoutInstitutPage]
})
export class AjoutInstitutPageModule {}
