import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArtifactComponent } from './manage-artifact.component';

describe('ManageArtifactComponent', () => {
  let component: ManageArtifactComponent;
  let fixture: ComponentFixture<ManageArtifactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageArtifactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageArtifactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
