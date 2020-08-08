import { TestBed } from '@angular/core/testing';

import { BomonService } from './bomon.service';

describe('BomonService', () => {
  let service: BomonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BomonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
