import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePatientPage } from './schedule-patient.page';

describe('SchedulePatientPage', () => {
  let component: SchedulePatientPage;
  let fixture: ComponentFixture<SchedulePatientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulePatientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
