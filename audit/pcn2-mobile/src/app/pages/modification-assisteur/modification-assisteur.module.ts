import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Dialogs } from '@ionic-native/dialogs/ngx';

import { IonicModule } from '@ionic/angular';

import { ModificationAssisteurPage } from './modification-assisteur';

const routes: Routes = [
  {
    path: '',
    component: ModificationAssisteurPage
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
  declarations: [ModificationAssisteurPage]
})
export class ModificationAssisteurPageModule {}
