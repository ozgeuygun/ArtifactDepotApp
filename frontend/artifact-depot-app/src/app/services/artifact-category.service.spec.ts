import { TestBed } from '@angular/core/testing';

import { ArtifactCategoryService } from './artifact-category.service';

describe('ArtifactCategoryService', () => {
  let service: ArtifactCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtifactCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
