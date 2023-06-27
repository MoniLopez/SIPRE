import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadronPredialComponent } from './padron-predial.component';

describe('PadronPredialComponent', () => {
  let component: PadronPredialComponent;
  let fixture: ComponentFixture<PadronPredialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PadronPredialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadronPredialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
