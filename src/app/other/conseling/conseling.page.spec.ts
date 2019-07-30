import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConselingPage } from './conseling.page';

describe('ConselingPage', () => {
  let component: ConselingPage;
  let fixture: ComponentFixture<ConselingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConselingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConselingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
