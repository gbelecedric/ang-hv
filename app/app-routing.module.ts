import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponent} from './test/test.component';
import {DetailComponent} from './detail/detail.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {Home2Component} from './home2/home2.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'home2', component: Home2Component},
  {path: 'test', component: TestComponent},
  {path: 'test/:id', component: DetailComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const ListComonent = [TestComponent, DetailComponent, NotFoundComponent, HomeComponent, Home2Component];
