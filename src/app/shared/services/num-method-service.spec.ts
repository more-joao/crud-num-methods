import { TestBed } from '@angular/core/testing';

import { NumMethodService } from './num-method-service';

describe('NumMethodService', () => {
  let service: NumMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
