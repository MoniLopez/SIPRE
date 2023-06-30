import { Component } from '@angular/core';
import { Router } from '@angular/router'; //Redigir a otras vistas
import { Cuentas } from 'src/app/interface/cuentas.interface';
import { DatosMpioService } from '../../service/datos-mpio.service'; //Llama servicio que contiene los datos de tasas e incrementos

@Component({
  selector: 'app-padron-predial',
  templateUrl: './padron-predial.component.html',
  styleUrls: ['./padron-predial.component.css']
})
export class PadronPredialComponent {
  constructor(private router: Router, private service: DatosMpioService){
    this.obtenerDatos();
  }

  cuentas: Cuentas[] = [];
  
  obtenerDatos(){
    this.service.valuacionMunicipio('1',2024).subscribe((data: Object )=>{
      const padronData = data as Cuentas [];
      this.cuentas = padronData;
    });
  }
}

