import { TestBed } from '@angular/core/testing';

import { DotthiService } from './dotthi.service';

describe('DotthiService', () => {
  let service: DotthiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotthiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
