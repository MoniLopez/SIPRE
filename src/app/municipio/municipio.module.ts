import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeleccionMunicipioComponent } from './seleccion-municipio/seleccion-municipio.component';
import { MunicipioRoutingModule } from './municipio-routing.module';
import { DatosMunicipioComponent } from './datos-municipio/datos-municipio.component';
import { ReactiveFormsModule } from '@angular/forms'; //Permite usar fromGroup

import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    SeleccionMunicipioComponent,
    DatosMunicipioComponent
  ],
  imports: [
    CommonModule,
    MunicipioRoutingModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class MunicipioModule { }
