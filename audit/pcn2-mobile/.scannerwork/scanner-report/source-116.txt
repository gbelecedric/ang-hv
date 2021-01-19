import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { FormsModule } from '@angular/forms';
import { ListePage } from './liste';
describe('ListePage', () => {
  let component: ListePage;
  let fixture: ComponentFixture<ListePage>;
  beforeEach(() => {
    const navControllerStub = () => ({
      navigateRoot: string => ({}),
      navigateForward: string => ({})
    });
    const menuControllerStub = () => ({ enable: arg => ({}) });
    const serviceServiceStub = () => ({
      getAllInstitution: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListePage],
      providers: [
        { provide: NavController, useFactory: navControllerStub },
        { provide: MenuController, useFactory: menuControllerStub },
        { provide: ServiceService, useFactory: serviceServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ListePage);
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
      spyOn(component, 'getListeInstitut').and.callThrough();
      component.ngOnInit();
      expect(component.getListeInstitut).toHaveBeenCalled();
    });
  });
  describe('getListeInstitut', () => {
    it('makes expected calls', () => {
      const serviceServiceStub: ServiceService = fixture.debugElement.injector.get(
        ServiceService
      );
      spyOn(serviceServiceStub, 'getAllInstitution').and.callThrough();
      component.getListeInstitut();
      expect(serviceServiceStub.getAllInstitution).toHaveBeenCalled();
    });
  });
  describe('ajoutinstitut', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
      spyOn(navControllerStub, 'navigateRoot').and.callThrough();
      component.ajoutinstitut();
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
