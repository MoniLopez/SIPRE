import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionMunicipioComponent } from './seleccion-municipio.component';

describe('SeleccionMunicipioComponent', () => {
  let component: SeleccionMunicipioComponent;
  let fixture: ComponentFixture<SeleccionMunicipioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionMunicipioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionMunicipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
