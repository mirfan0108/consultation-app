import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainDetailPage } from './complain-detail.page';

describe('ComplainDetailPage', () => {
  let component: ComplainDetailPage;
  let fixture: ComponentFixture<ComplainDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplainDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
