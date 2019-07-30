import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUiPage } from './test-ui.page';

describe('TestUiPage', () => {
  let component: TestUiPage;
  let fixture: ComponentFixture<TestUiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestUiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
