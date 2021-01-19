import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
import {ListeComponent} from '../components/liste/liste.component';
import {MenuComponent} from '../components/menu/menu.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CatComponent} from './cat/cat.component';
import {NotComponent} from './not/not.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {ImageViewerModule} from 'ngx-image-viewer';
import {CodemirrorModule} from '@ctrl/ngx-codemirror';
import {MatTabsModule} from '@angular/material';
import {EditorComponent} from '../components/editor/editor.component';
import {WidComponent} from './wid/wid.component';
import {ContComponent} from './cont/cont.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category/:id', component: CatComponent },
  { path: 'widget/:id', component: WidComponent },
  { path: 'contenue/:id', component: ContComponent },
  { path: '**', component: NotComponent}
];
@NgModule({
  declarations: [DashboardComponent, HeaderComponent,  FooterComponent, ListeComponent, MenuComponent, CatComponent, NotComponent, EditorComponent, WidComponent, ContComponent],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, NgxDropzoneModule, ImageViewerModule, CodemirrorModule, MatTabsModule],
  exports: [RouterModule, HeaderComponent, FooterComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MemberRoutingModule { }
// export const MembersComponent = [DashboardComponent];
