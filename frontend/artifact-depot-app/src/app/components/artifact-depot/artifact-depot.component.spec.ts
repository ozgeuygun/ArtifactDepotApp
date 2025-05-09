import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactDepotComponent } from './artifact-depot.component';

describe('ArtifactDepotComponent', () => {
  let component: ArtifactDepotComponent;
  let fixture: ComponentFixture<ArtifactDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactDepotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
