import { TestBed } from '@angular/core/testing';

import { RestrictedAccessService } from './restricted-access.service';

describe('RestrictedAccessService', () => {
  let service: RestrictedAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestrictedAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
