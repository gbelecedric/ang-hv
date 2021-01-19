import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';

import { IonicModule } from '@ionic/angular';

import { ModificationIntitutPage } from './edit';

const routes: Routes = [
  {
    path: '',
    component: ModificationIntitutPage
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
  declarations: [ModificationIntitutPage]
})
export class ModificationInstitutPageModule {}
