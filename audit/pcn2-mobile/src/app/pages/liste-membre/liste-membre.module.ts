import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';
// import { Toast } from '@ionic-native/toast/ngx';
import { FilterPipe, SortByPipe, FirstLetterPipe, OrderByPipe, FilterByStatusPipe } from './pipes'


import { IonicModule } from '@ionic/angular';

import { ListeMembrePage } from './liste-membre';

const routes: Routes = [
  {
    path: '',
    component: ListeMembrePage
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
  declarations: [ListeMembrePage,
    FilterPipe,
    SortByPipe,
    FirstLetterPipe,
    OrderByPipe,
    FilterByStatusPipe],
})
export class ListeMembrePageModule { }
