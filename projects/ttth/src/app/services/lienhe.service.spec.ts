import { TestBed } from '@angular/core/testing';

import { LienheService } from './lienhe.service';

describe('LienheService', () => {
  let service: LienheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
