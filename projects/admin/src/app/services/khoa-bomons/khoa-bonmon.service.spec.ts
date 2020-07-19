import { TestBed } from '@angular/core/testing';

import { KhoaBonmonService } from './khoa-bonmon.service';

describe('KhoaBonmonService', () => {
  let service: KhoaBonmonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhoaBonmonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
