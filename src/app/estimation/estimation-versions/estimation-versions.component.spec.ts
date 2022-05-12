import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationVersionsComponent } from './estimation-versions.component';

describe('EstimationVersionsComponent', () => {
  let component: EstimationVersionsComponent;
  let fixture: ComponentFixture<EstimationVersionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationVersionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});