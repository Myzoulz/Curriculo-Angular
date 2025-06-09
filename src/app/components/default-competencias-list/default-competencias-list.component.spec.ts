import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCompetenciasListComponent } from './default-competencias-list.component';

describe('DefaultCompetenciasListComponent', () => {
  let component: DefaultCompetenciasListComponent;
  let fixture: ComponentFixture<DefaultCompetenciasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultCompetenciasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultCompetenciasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
