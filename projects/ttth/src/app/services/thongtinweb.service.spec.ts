import { TestBed } from '@angular/core/testing';

import { ThongtinwebService } from './thongtinweb.service';

describe('ThongtinwebService', () => {
  let service: ThongtinwebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThongtinwebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
