import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPcnPage } from './details-pcn.page';

describe('DetailsPcnPage', () => {
  let component: DetailsPcnPage;
  let fixture: ComponentFixture<DetailsPcnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPcnPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPcnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
