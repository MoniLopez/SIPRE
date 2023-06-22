import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMunicipioComponent } from './datos-municipio.component';

describe('DatosMunicipioComponent', () => {
  let component: DatosMunicipioComponent;
  let fixture: ComponentFixture<DatosMunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosMunicipioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
