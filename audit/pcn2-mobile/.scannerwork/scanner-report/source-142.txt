import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAssoPage } from './details-asso.page';

describe('DetailsAssoPage', () => {
  let component: DetailsAssoPage;
  let fixture: ComponentFixture<DetailsAssoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAssoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAssoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
