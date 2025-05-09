import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDepotComponent } from './manage-depot.component';

describe('ManageDepotComponent', () => {
  let component: ManageDepotComponent;
  let fixture: ComponentFixture<ManageDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDepotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
