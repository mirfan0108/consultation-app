import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorPage } from './counselor.page';

describe('CounselorPage', () => {
  let component: CounselorPage;
  let fixture: ComponentFixture<CounselorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounselorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounselorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
