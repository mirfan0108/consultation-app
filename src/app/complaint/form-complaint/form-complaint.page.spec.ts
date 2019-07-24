import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComplaintPage } from './form-complaint.page';

describe('FormComplaintPage', () => {
  let component: FormComplaintPage;
  let fixture: ComponentFixture<FormComplaintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComplaintPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComplaintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
