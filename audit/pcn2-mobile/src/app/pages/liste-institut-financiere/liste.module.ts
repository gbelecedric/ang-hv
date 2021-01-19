import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';
// import { Toast } from '@ionic-native/toast/ngx';

import { IonicModule } from '@ionic/angular';

import { ListePage } from './liste';
import { FilterPipe, SortByPipe, FirstLetterPipe, OrderByPipe } from './pipes';

const routes: Routes = [
  {
    path: '',
    component: ListePage
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
  declarations: [
    ListePage,
    FilterPipe,
    SortByPipe,
    FirstLetterPipe,
    OrderByPipe
  ]
})
export class ListePageModule { }