import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionMunicipioComponent } from './seleccion-municipio/seleccion-municipio.component';
import { DatosMunicipioComponent } from './datos-municipio/datos-municipio.component';

const routes: Routes = [
  { path: 'selecMpio', component: SeleccionMunicipioComponent },
  { path: 'municipio/:id', component: DatosMunicipioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //conecta con todos los hijos
  exports: [RouterModule]
})
export class MunicipioRoutingModule { }
