import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyComplaintPage } from './modify-complaint.page';

describe('ModifyComplaintPage', () => {
  let component: ModifyComplaintPage;
  let fixture: ComponentFixture<ModifyComplaintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyComplaintPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyComplaintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
