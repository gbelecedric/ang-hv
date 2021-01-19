import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListeEvenementPage } from './liste-evenement';
describe('ListeEvenementPage', () => {
  let component: ListeEvenementPage;
  let fixture: ComponentFixture<ListeEvenementPage>;
  beforeEach(() => {
    const navControllerStub = () => ({
      navigateRoot: string => ({}),
      navigateForward: string => ({})
    });
    const menuControllerStub = () => ({ enable: arg => ({}) });
    const loadingControllerStub = () => ({ create: object => ({}) });
    const serviceServiceStub = () => ({
      getAllEvenement: idAsso => ({ subscribe: f => f({}) })
    });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListeEvenementPage],
      providers: [
        { provide: NavController, useFactory: navControllerStub },
        { provide: MenuController, useFactory: menuControllerStub },
        { provide: LoadingController, useFactory: loadingControllerStub },
        { provide: ServiceService, useFactory: serviceServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub }
      ]
    });
    fixture = TestBed.createComponent(ListeEvenementPage);
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
  describe('ajoutevent', () => {
    it('makes expected calls', () => {
      const navControllerStub: NavController = fixture.debugElement.injector.get(
        NavController
      );
      spyOn(navControllerStub, 'navigateRoot').and.callThrough();
      component.ajoutevent();
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
