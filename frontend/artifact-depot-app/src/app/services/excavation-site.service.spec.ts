import { TestBed } from '@angular/core/testing';

import { ExcavationSiteService } from './excavation-site.service';

describe('ExcavationSiteService', () => {
  let service: ExcavationSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcavationSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
