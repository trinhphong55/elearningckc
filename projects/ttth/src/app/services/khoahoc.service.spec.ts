import { TestBed } from '@angular/core/testing';

import { KhoahocService } from './khoahoc.service';

describe('KhoahocService', () => {
  let service: KhoahocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhoahocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
