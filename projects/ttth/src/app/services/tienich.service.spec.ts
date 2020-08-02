import { TestBed } from '@angular/core/testing';

import { TienichService } from './tienich.service';

describe('TienichService', () => {
  let service: TienichService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TienichService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
