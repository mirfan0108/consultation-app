import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConselingDetailPage } from './conseling-detail.page';

describe('ConselingDetailPage', () => {
  let component: ConselingDetailPage;
  let fixture: ComponentFixture<ConselingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConselingDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConselingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
