import { TestBed } from '@angular/core/testing';

import { LoaidonviService } from './loaidonvi.service';

describe('LoaidonviService', () => {
  let service: LoaidonviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaidonviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
