import { TestBed } from '@angular/core/testing';

import { PrimerakServiceService } from './primerak-service.service';

describe('PrimerakServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrimerakServiceService = TestBed.get(PrimerakServiceService);
    expect(service).toBeTruthy();
  });
});
