import { TestBed } from '@angular/core/testing';

import { PublikacijaServiceService } from './publikacija-service.service';

describe('PublikacijaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublikacijaServiceService = TestBed.get(PublikacijaServiceService);
    expect(service).toBeTruthy();
  });
});
