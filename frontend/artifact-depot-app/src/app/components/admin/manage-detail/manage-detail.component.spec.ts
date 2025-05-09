import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDetailComponent } from './manage-detail.component';

describe('ManageDetailComponent', () => {
  let component: ManageDetailComponent;
  let fixture: ComponentFixture<ManageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
