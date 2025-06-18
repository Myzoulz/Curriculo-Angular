import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultHomeUserLayoutComponent } from './default-home-user-layout.component';

describe('DefaultHomeUserLayoutComponent', () => {
  let component: DefaultHomeUserLayoutComponent;
  let fixture: ComponentFixture<DefaultHomeUserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultHomeUserLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultHomeUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
