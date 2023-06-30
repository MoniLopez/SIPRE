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
  constructor(private router: Router, private service: DatosMpioService){}

  //cuentas: Cuentas[] = [];
  btnAceptar(){
    //this.router.navigate(['dashboard/municipios/selecMpio']); //Mueve a la pagina que indica el router
  }

  pruebaCuentas: Cuentas[]=[
    {noControl: 258,
      Municipio: 'acajete',
      NoMpio: 1,
      tipoCuenta: 'urbano',
      NoCuenta: 258963,
      superficieTerreno: 789,
      valorTerreno: 258,
      valorTerrenoCalculado: 147,
      superficieConstruccion: 963,
      valorConstruccion: 123,
      valorConstruccionCalculado: 147,
      superficieObra: 789,
      valorObra: 963,
      valorComplementarioCalculado: 321,
      baseGravable: 852,
      baseGravableCalculada: 159,
      IMPUESTO: 753,
      impuestoAjustado: 654,
      impuestoCalculado: 458,
      difrencias: 25,
      porcentaje: 78,
      motivo: 'motivo'
    },
    {noControl: 258,
      Municipio: 'acajeteDos',
      NoMpio: 1,
      tipoCuenta: 'urbanoDos',
      NoCuenta: 258963,
      superficieTerreno: 789,
      valorTerreno: 258,
      valorTerrenoCalculado: 147,
      superficieConstruccion: 963,
      valorConstruccion: 123,
      valorConstruccionCalculado: 147,
      superficieObra: 789,
      valorObra: 963,
      valorComplementarioCalculado: 321,
      baseGravable: 852,
      baseGravableCalculada: 159,
      IMPUESTO: 753,
      impuestoAjustado: 654,
      impuestoCalculado: 458,
      difrencias: 25,
      porcentaje: 78,
      motivo: 'motivo'
    }
  ];
  
  /*obtenerDatos(){
    this.service.valuacionMunicipio('1',2024).subscribe((data: Object )=>{
      const padronData = data as Cuentas [];
      this.cuentas = padronData;
      console.log(this.cuentas);
    });
  }*/
}

