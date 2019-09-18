import { TestBed } from '@angular/core/testing';

import { ObavestenjeService } from './obavestenje.service';

describe('ObavestenjeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObavestenjeService = TestBed.get(ObavestenjeService);
    expect(service).toBeTruthy();
  });
});
