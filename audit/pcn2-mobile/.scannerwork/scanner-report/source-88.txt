import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { FormBuilder } from '@angular/forms';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { ActivatedRoute } from '@angular/router';
import { DetailsInstitutPage } from './details-institut-financiere';
describe('DetailsInstitutPage', () => {
  let component: DetailsInstitutPage;
  let fixture: ComponentFixture<DetailsInstitutPage>;
  beforeEach(() => {
    const navControllerStub = () => ({ navigateForward: string => ({}) });
    const menuControllerStub = () => ({ enable: arg => ({}) });
    const toastControllerStub = () => ({});
    const loadingControllerStub = () => ({});
    const alertControllerStub = () => ({});
    const serviceServiceStub = () => ({
      getOneInstitut: id => ({ subscribe: f => f({}) })
    });
    const formBuilderStub = () => ({});
    const dialogsStub = () => ({});
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DetailsInstitutPage],
      providers: [
        { provide: NavController, useFactory: navControllerStub },
        { provide: MenuController, useFactory: menuControllerStub },
        { provide: ToastController, useFactory: toastControllerStub },
        { provide: LoadingController, useFactory: loadingControllerStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: ServiceService, useFactory: serviceServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Dialogs, useFactory: dialogsStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub }
      ]
    });
    fixture = TestBed.createComponent(DetailsInstitutPage);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ionViewWillEnter', () => {
    it('makes expected calls', () => {
      const menuControllerStub: MenuController = fixture.debugElement.injector.get(
        MenuController
      );
      spyOn(menuControllerStub, 'enable').and.callThrough();
      component.ionViewWillEnter();
      expect(menuControllerStub.enable).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getOneInstitut').and.callThrough();
      component.ngOnInit();
      expect(component.getOneInstitut).toHaveBeenCalled();
    });
  });
  describe('listeInstitut', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
      spyOn(navControllerStub, 'navigateForward').and.callThrough();
      component.listeInstitut();
      expect(navControllerStub.navigateForward).toHaveBeenCalled();
    });
  });
  describe('getOneInstitut', () => {
    it('makes expected calls', () => {
      const serviceServiceStub: ServiceService = fixture.debugElement.injector.get(
        ServiceService
      );
      spyOn(serviceServiceStub, 'getOneInstitut').and.callThrough();
      component.getOneInstitut();
      expect(serviceServiceStub.getOneInstitut).toHaveBeenCalled();
    });
  });
});
