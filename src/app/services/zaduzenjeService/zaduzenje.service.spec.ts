import { TestBed } from '@angular/core/testing';

import { ZaduzenjeService } from './zaduzenje.service';

describe('ZaduzenjeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZaduzenjeService = TestBed.get(ZaduzenjeService);
    expect(service).toBeTruthy();
  });
});
