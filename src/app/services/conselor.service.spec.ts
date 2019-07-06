import { TestBed } from '@angular/core/testing';

import { ConselorService } from './conselor.service';

describe('ConselorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConselorService = TestBed.get(ConselorService);
    expect(service).toBeTruthy();
  });
});
