import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { FormsModule } from '@angular/forms';
import { ListeAssisteurPage } from './liste-assisteur';
describe('ListeAssisteurPage', () => {
  let component: ListeAssisteurPage;
  let fixture: ComponentFixture<ListeAssisteurPage>;
  beforeEach(() => {
    const navControllerStub = () => ({
      navigateRoot: string => ({}),
      navigateForward: string => ({})
    });
    const menuControllerStub = () => ({ enable: arg => ({}) });
    const serviceServiceStub = () => ({
      getAllAssist: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListeAssisteurPage],
      providers: [
        { provide: NavController, useFactory: navControllerStub },
        { provide: MenuController, useFactory: menuControllerStub },
        { provide: ServiceService, useFactory: serviceServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ListeAssisteurPage);
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
      spyOn(component, 'getListeAssis').and.callThrough();
      component.ngOnInit();
      expect(component.getListeAssis).toHaveBeenCalled();
    });
  });
  describe('getListeAssis', () => {
    it('makes expected calls', () => {
      const serviceServiceStub: ServiceService = fixture.debugElement.injector.get(
        ServiceService
      );
      spyOn(serviceServiceStub, 'getAllAssist').and.callThrough();
      component.getListeAssis();
      expect(serviceServiceStub.getAllAssist).toHaveBeenCalled();
    });
  });
  describe('ajoutassisteur', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
      spyOn(navControllerStub, 'navigateRoot').and.callThrough();
      component.ajoutassisteur();
      expect(navControllerStub.navigateRoot).toHaveBeenCalled();
    });
  });
  describe('home', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
      spyOn(navControllerStub, 'navigateForward').and.callThrough();
      component.home();
      expect(navControllerStub.navigateForward).toHaveBeenCalled();
    });
  });
});
