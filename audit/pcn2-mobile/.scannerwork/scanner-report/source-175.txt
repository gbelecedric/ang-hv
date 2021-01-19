import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {FilterPipe, SortByPipe, FirstLetterPipe, OrderByPipe} from './pipes'

import { IonicModule } from '@ionic/angular';

import { ListeAssisteurPage } from './liste-assisteur';

const routes: Routes = [
  {
    path: '',
    component: ListeAssisteurPage
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
    ListeAssisteurPage,
    FilterPipe,
    SortByPipe,
    FirstLetterPipe,
    OrderByPipe
  ]
})
export class ListeAssisteurPageModule {}
