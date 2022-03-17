import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationEditComponent } from './estimation-edit.component';

describe('EstimationEditComponent', () => {
  let component: EstimationEditComponent;
  let fixture: ComponentFixture<EstimationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
