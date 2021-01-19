import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {FilterPipe, SortByPipe, FirstLetterPipe, OrderByPipe, TruncatePipe, FilterByStatusPipe} from './pipes'

import { IonicModule } from '@ionic/angular';

import { ListeEvenementPage } from './liste-evenement';

const routes: Routes = [
  {
    path: '',
    component: ListeEvenementPage
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
  ],
  declarations: [
    ListeEvenementPage,
    FilterPipe,
    SortByPipe,
    FirstLetterPipe,
    OrderByPipe,
    TruncatePipe,
    FilterByStatusPipe
  ]
})
export class ListeEvenementPageModule {}
