import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingPage } from './boarding.page';

describe('BoardingPage', () => {
  let component: BoardingPage;
  let fixture: ComponentFixture<BoardingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
