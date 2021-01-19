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
import { AjoutInstitutPage } from './add';
describe('AjoutInstitutPage', () => {
  let component: AjoutInstitutPage;
  let fixture: ComponentFixture<AjoutInstitutPage>;
  beforeEach(() => {
    const navControllerStub = () => ({ navigateForward: string => ({}) });
    const menuControllerStub = () => ({ enable: arg => ({}) });
    const toastControllerStub = () => ({});
    const loadingControllerStub = () => ({});
    const alertControllerStub = () => ({
      create: object => ({ present: () => ({}) })
    });
    const serviceServiceStub = () => ({
      saveInstitut: (value, value1) => ({ subscribe: f => f({}) })
    });
    const formBuilderStub = () => ({ group: object => ({}) });
    const dialogsStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AjoutInstitutPage],
      providers: [
        { provide: NavController, useFactory: navControllerStub },
        { provide: MenuController, useFactory: menuControllerStub },
        { provide: ToastController, useFactory: toastControllerStub },
        { provide: LoadingController, useFactory: loadingControllerStub },
        { provide: AlertController, useFactory: alertControllerStub },
        { provide: ServiceService, useFactory: serviceServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Dialogs, useFactory: dialogsStub }
      ]
    });
    fixture = TestBed.createComponent(AjoutInstitutPage);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('isSubmitted defaults to: false', () => {
    expect(component.isSubmitted).toEqual(false);
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
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
  describe('listeAssiteur', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
      spyOn(navControllerStub, 'navigateForward').and.callThrough();
      component.listeAssiteur();
      expect(navControllerStub.navigateForward).toHaveBeenCalled();
    });
  });
  describe('presentAlert', () => {
    it('makes expected calls', () => {
      const alertControllerStub: AlertController = fixture.debugElement.injector.get(
        AlertController
      );
      spyOn(alertControllerStub, 'create').and.callThrough();
      component.presentAlert();
      expect(alertControllerStub.create).toHaveBeenCalled();
    });
  });
  describe('saveInstitut', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
      const serviceServiceStub: ServiceService = fixture.debugElement.injector.get(
        ServiceService
      );
      spyOn(component, 'presentAlert').and.callThrough();
      spyOn(navControllerStub, 'navigateForward').and.callThrough();
      spyOn(serviceServiceStub, 'saveInstitut').and.callThrough();
      component.saveInstitut();
      expect(component.presentAlert).toHaveBeenCalled();
      expect(navControllerStub.navigateForward).toHaveBeenCalled();
      expect(serviceServiceStub.saveInstitut).toHaveBeenCalled();
    });
  });
});
