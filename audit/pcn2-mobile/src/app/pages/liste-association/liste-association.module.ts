import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';
// import { Toast } from '@ionic-native/toast/ngx';
import {FilterPipe, SortByPipe, FirstLetterPipe, OrderByPipe} from './pipes'


import { IonicModule } from '@ionic/angular';

import { ListeAssociationPage } from './liste-association';

const routes: Routes = [
  {
    path: '',
    component: ListeAssociationPage
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
  declarations: [ListeAssociationPage,
    FilterPipe,
    SortByPipe,
    FirstLetterPipe,
    OrderByPipe]
})
export class ListeAssociationPageModule {}
