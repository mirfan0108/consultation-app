import { TestBed } from '@angular/core/testing';

import { MiniServicesService } from './mini-services.service';

describe('MiniServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MiniServicesService = TestBed.get(MiniServicesService);
    expect(service).toBeTruthy();
  });
});
