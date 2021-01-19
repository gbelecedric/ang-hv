import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ServiceService } from 'src/app/service.service';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DataPassProvider } from '../../../providers/data-pass/data-pass';
import { DetailsEvenementPage } from './details-evenement';
describe('DetailsEvenementPage', () => {
  let component: DetailsEvenementPage;
  let fixture: ComponentFixture<DetailsEvenementPage>;
  beforeEach(() => {
    const navControllerStub = () => ({ navigateForward: arg => ({}) });
    const menuControllerStub = () => ({ enable: arg => ({}) });
    const serviceServiceStub = () => ({
      getOneEvenement: id => ({ subscribe: f => f({}) })
    });
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const popoverControllerStub = () => ({
      create: object => ({ present: () => ({}) })
    });
    const dataPassProviderStub = () => ({ PassCommunityId: idEvent => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DetailsEvenementPage],
      providers: [
        { provide: NavController, useFactory: navControllerStub },
        { provide: MenuController, useFactory: menuControllerStub },
        { provide: ServiceService, useFactory: serviceServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: PopoverController, useFactory: popoverControllerStub },
        { provide: DataPassProvider, useFactory: dataPassProviderStub }
      ]
    });
    fixture = TestBed.createComponent(DetailsEvenementPage);
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
      spyOn(component, 'getOneEvenement').and.callThrough();
      component.ngOnInit();
      expect(component.getOneEvenement).toHaveBeenCalled();
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
