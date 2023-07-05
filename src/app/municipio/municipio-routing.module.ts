import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionMunicipioComponent } from './seleccion-municipio/seleccion-municipio.component';
import { PadronPredialComponent } from './padron-predial/padron-predial.component';

const routes: Routes = [
  { path: 'selecMpio', component: SeleccionMunicipioComponent },
  { path: 'padronPredial/:numMpio/:municipio', component: PadronPredialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //conecta con todos los hijos
  exports: [RouterModule]
})
export class MunicipioRoutingModule { }
