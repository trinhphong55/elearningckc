import { TestBed } from '@angular/core/testing';

import { DangkidotthiService } from './dangkidotthi.service';

describe('DangkidotthiService', () => {
  let service: DangkidotthiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangkidotthiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
