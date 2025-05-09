import { TestBed } from '@angular/core/testing';

import { ArtifactMaterialService } from './artifact-material.service';

describe('ArtifactMaterialService', () => {
  let service: ArtifactMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtifactMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
