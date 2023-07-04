import { Component } from '@angular/core';
import { Router } from '@angular/router'; //Redigir a otras vistas
import { Cuentas } from 'src/app/interface/cuentas.interface'; //Para uso de la interfaz
import { DatosMpioService } from '../../service/datos-mpio.service'; //Llama servicio que contiene los datos de tasas e incrementos


@Component({
  selector: 'app-padron-predial',
  templateUrl: './padron-predial.component.html',
  styleUrls: ['./padron-predial.component.css']
})
export class PadronPredialComponent {
  constructor(private router: Router, private service: DatosMpioService){
  }

  cuentas: Cuentas[] = [];
  
  elementosPorPagina = 15;
  paginaActual = 1;
  numeroTotalPaginas = 0;
  paginasMostradas = 10; // Número de páginas mostradas en la paginación
  paginas: number[] = []; // Almacena las páginas mostradas en la paginación

  ngOnInit(){
    this.obtenerDatos();
  }

  //Recibe los datos de las cuentas valuadas del municipio
  obtenerDatos(){
    this.service.valuacionMunicipio('1',2024).subscribe((data: Object )=>{
      const padronData = data as Cuentas [];
      this.cuentas = padronData;
      this.actualizarPaginasMostradas();
    });
    
  }
 
  
  //***Funciones para mostrar paginación adecuada***

  calcularNumeroTotalPaginas(): number {
    return Math.ceil(this.cuentas.length / this.elementosPorPagina);
  }

  actualizarPaginasMostradas() { //Permite que se muestre un rango de páginas en la paginación
    this.numeroTotalPaginas = this.calcularNumeroTotalPaginas();
    let inicio = this.paginaActual - Math.floor(this.paginasMostradas / 2);
    if (inicio < 1) {
      inicio = 1;
    }

    let fin = inicio + this.paginasMostradas - 1;
    if (fin > this.numeroTotalPaginas) {
      fin = this.numeroTotalPaginas;
      inicio = fin - this.paginasMostradas + 1;
      if (inicio < 1) {
        inicio = 1;
      }
    }

    this.paginas = Array.from({ length: fin - inicio + 1 }, (_, index) => inicio + index);
  }

  siguientePagina(){
    if (this.paginaActual < this.calcularNumeroTotalPaginas())
    {
      this.paginaActual++;
      this.actualizarPaginasMostradas();
    }
  }

  anteriorPagina(){
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginasMostradas();
    }
  }

  primeraPagina(){
    this.paginaActual = 1;
    this.actualizarPaginasMostradas();
  }

  ultimaPagina() {
    this.paginaActual = this.calcularNumeroTotalPaginas();
    this.actualizarPaginasMostradas();
  }
    
}

