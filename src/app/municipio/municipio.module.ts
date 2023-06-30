import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeleccionMunicipioComponent } from './seleccion-municipio/seleccion-municipio.component';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { DatosMunicipioComponent } from './datos-municipio/datos-municipio.component';
import { ReactiveFormsModule } from '@angular/forms'; //Permite usar fromGroup

import { MatCardModule } from '@angular/material/card';
import { PadronPredialComponent } from './padron-predial/padron-predial.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';


@NgModule({
  declarations: [
    SeleccionMunicipioComponent,
    DatosMunicipioComponent,
    PadronPredialComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    MunicipioRoutingModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class MunicipioModule { }
