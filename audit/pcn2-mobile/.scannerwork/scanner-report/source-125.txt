import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMembrePage } from './details-membre.page';

describe('DetailsMembrePage', () => {
  let component: DetailsMembrePage;
  let fixture: ComponentFixture<DetailsMembrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMembrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMembrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
