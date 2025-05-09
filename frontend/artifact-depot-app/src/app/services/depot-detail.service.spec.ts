import { TestBed } from '@angular/core/testing';

import { DepotDetailService } from './depot-detail.service';

describe('DepotDetailService', () => {
  let service: DepotDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepotDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
