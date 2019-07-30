import { TestBed } from '@angular/core/testing';

import { ConselingApiService } from './conseling-api.service';

describe('ConselingApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConselingApiService = TestBed.get(ConselingApiService);
    expect(service).toBeTruthy();
  });
});
