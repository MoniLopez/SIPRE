import { Component } from '@angular/core';
import { Router } from '@angular/router'; //Redigir a otras vistas

@Component({
  selector: 'app-padron-predial',
  templateUrl: './padron-predial.component.html',
  styleUrls: ['./padron-predial.component.css']
})
export class PadronPredialComponent {
  constructor(private router: Router){}

  btnAceptar(){
    this.router.navigate(['dashboard/municipios/selecMpio']); //Mueve a la pagina que indica el router
  }
}

