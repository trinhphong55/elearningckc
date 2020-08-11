import { TestBed } from '@angular/core/testing';

import { DiemthiService } from './diemthi.service';

describe('DiemthiService', () => {
  let service: DiemthiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiemthiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
