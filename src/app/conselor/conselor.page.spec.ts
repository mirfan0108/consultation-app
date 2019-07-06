import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConselorPage } from './conselor.page';

describe('ConselorPage', () => {
  let component: ConselorPage;
  let fixture: ComponentFixture<ConselorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConselorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConselorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
