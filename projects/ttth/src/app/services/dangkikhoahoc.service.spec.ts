import { TestBed } from '@angular/core/testing';

import { DangkikhoahocService } from './dangkikhoahoc.service';

describe('DangkikhoahocService', () => {
  let service: DangkikhoahocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangkikhoahocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
