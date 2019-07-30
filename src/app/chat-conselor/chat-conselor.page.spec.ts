import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConselorPage } from './chat-conselor.page';

describe('ChatConselorPage', () => {
  let component: ChatConselorPage;
  let fixture: ComponentFixture<ChatConselorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatConselorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatConselorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
