import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactListComponent } from './artifact-list.component';

describe('ArtifactListComponent', () => {
  let component: ArtifactListComponent;
  let fixture: ComponentFixture<ArtifactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtifactListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtifactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
