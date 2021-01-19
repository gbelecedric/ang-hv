import { BrowserModule } from '@angular/platform-browser';
// import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StorageModule } from '@ngx-pwa/local-storage';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListComponent} from './app-routing.module';
import {MatBottomSheetModule, MatDialogModule, MatSnackBarModule, MatTabsModule} from '@angular/material';
import { DialogComponent } from './components/dialog/dialog.component';
import {MemberRoutingModule} from './members/member-routing.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageViewerModule } from 'ngx-image-viewer';
import { ModalComponent } from './components/modal/modal.component';
const config = {
  btnClass: 'default', // The CSS class(es) that will apply to the buttons
  zoomFactor: 0.1, // The amount that the scale will be increased by
  containerBackgroundColor: '#fff', // The color to use for the background. This can provided in hex, or rgb(a).
  wheelZoom: true, // If true, the mouse wheel can be used to zoom in
  allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
  allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
  btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
    zoomIn: 'fa fa-plus',
    zoomOut: 'fa fa-minus',
    rotateClockwise: 'fa fa-undo',
    rotateCounterClockwise: 'fa fa-undo',
    next: 'fa fa-arrow-right',
    prev: 'fa fa-arrow-left',
    fullscreen: 'fa fa-arrows-alt',
  },
  btnShow: {
    zoomIn: true,
    zoomOut: true,
    rotateClockwise: true,
    rotateCounterClockwise: true,
    next: true,
    prev: true
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DialogComponent,
    ModalComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatTabsModule,
    StorageModule.forRoot({
      IDBNoWrap: true,
    }),
    MemberRoutingModule,
    NgxDropzoneModule,
    ImageViewerModule.forRoot(config),
    // AceEditorModule,
    // CodemirrorModule
  ],
  providers: [],
  exports: [
    ModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
