import { TestBed } from '@angular/core/testing';

import { DeleteConnectorService } from './delete-connector.service';

describe('DeleteConnectorService', () => {
  let service: DeleteConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
