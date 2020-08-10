import { TestBed } from '@angular/core/testing';

import { DangkilophocService } from './dangkilophoc.service';

describe('DangkilophocService', () => {
  let service: DangkilophocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangkilophocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
