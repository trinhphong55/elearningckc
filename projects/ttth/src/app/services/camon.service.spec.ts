import { TestBed } from '@angular/core/testing';

import { CamonService } from './camon.service';

describe('CamonService', () => {
  let service: CamonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
