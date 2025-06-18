import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCandidateDetailComponent } from './admin-candidate-detail.component';

describe('AdminCandidateDetailComponent', () => {
  let component: AdminCandidateDetailComponent;
  let fixture: ComponentFixture<AdminCandidateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCandidateDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCandidateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
