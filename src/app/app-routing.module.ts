import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, //redirije a la vista login
  { path: 'login', component: LoginComponent }, //indicar quien es login
  {
    path: 'dashboard', component: PagesComponent, //se envía dashboard
    children: [ 
      {
        path: 'municipios',
        loadChildren: () => import('./municipio/municipio.module').then(m => m.MunicipioModule)
      }
    ],
    canActivate: [AuthGuard] //Sólo permite acceder a las vitas con previa sesión iniciada
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
