import { Component } from '@angular/core';
import { Router } from '@angular/router'; //Redigir a otras vistas
import { Cuentas } from 'src/app/interface/cuentas.interface'; //Para uso de la interfaz con la que almacenan los datos recibidos de la API
import { DatosMpioService } from '../../service/datos-mpio.service'; //Llama servicio que contiene los datos de tasas e incrementos
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx'; //Para generar archivo excel

@Component({
  selector: 'app-padron-predial',
  templateUrl: './padron-predial.component.html',
  styleUrls: ['./padron-predial.component.css']
})
export class PadronPredialComponent {
  constructor(private router: Router, private service: DatosMpioService, private route: ActivatedRoute){
  }

  numMpio=''; //Contiene número de Municipio con el que se está trabajando
  municipio=''; //Tiene el nombre del municipio
  tipo=''; //Guarda si el padron a mostrar es el "normal" o el de cuentas fuera de rango
  cuentas: Cuentas[] = []; //Guarda los datos recibidos de la API de las cuentas valuadas, es de tipo interfaz
  elementosPorPagina = 15; //Cuantas cuentas valudas se mostrarán en la tabla de este componente
  paginaActual = 1; //Para inicio del uso de paginación de la tabla
  numeroTotalPaginas = 0; //Guarda el total de paginas que tendrá la tabla de acuerdos a los datos recibidos de la API
  paginasMostradas = 10; // Número de páginas mostradas en la paginación
  paginas: number[] = []; // Almacena las páginas mostradas en la paginación

  ngOnInit(){
    this.numMpio = String(this.route.snapshot.paramMap.get('numMpio')); //Mediante enrutador con parametros de ruta se recibe el número de municipio
    this.municipio = String(this.route.snapshot.paramMap.get('municipio')); //Mediante enrutador con parametros de ruta se recibe el nombre del municipio
    this.tipo = String(this.route.snapshot.paramMap.get('tipo')); //Mediante enrutador con parametros de ruta se recibe el tipo de padron a mostrar
    if(this.tipo == 'padronFactura'){
      this.obtenerDatos(); //Llama a la función obtenerDatos
    }else{
      this.obtenerCuentasFueraRango(); //Llama a la función obtenerCuentasFueraRango
    }
    
  }

  //Recibe los datos de las cuentas valuadas del municipio
  obtenerDatos(){
    //Consume API enviando numero de municipio y el año en que se está trabajando
    this.service.valuacionMunicipio(this.numMpio, 2024).subscribe((data: Object )=>{
      //Al ser demasidas cuentas recibidas con varias propiedades, se hace uno de la interfaz Cuentas
      const padronData = data as Cuentas []; 
      this.cuentas = padronData;
      this.actualizarPaginasMostradas(); //Para mostrar desde inicio el rango de paginación
    });
    
  }

  //Recibe los datos de las cuentas valuadas que están fuera del rango del municipio
  obtenerCuentasFueraRango(){
    //Consume API enviando numero de municipio y el año en que se está trabajando
    this.service.cuentasFueraRango(this.numMpio, 2024).subscribe((data: Object )=>{
      //Al ser demasidas cuentas recibidas con varias propiedades, se hace uno de la interfaz Cuentas
      const padronData = data as Cuentas []; 
      this.cuentas = padronData;
      this.actualizarPaginasMostradas(); //Para mostrar desde inicio el rango de paginación
    });
    
  }
   
  //***Funciones para mostrar paginación adecuada***
  calcularNumeroTotalPaginas(): number { //Genera el total de paginas que se usarán de acuerdo al total de elementos recibidos y el numero de elementos mostrados por página
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

  siguientePagina(){ //Se llama al hacer cambio de pagina
    if (this.paginaActual < this.calcularNumeroTotalPaginas())
    {
      this.paginaActual++;
      this.actualizarPaginasMostradas();
    }
  }

  anteriorPagina(){ //Se llama al hacer cambio de pagina
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginasMostradas();
    }
  }

  primeraPagina(){ //Se llama cuando se selecciona la primera página
    this.paginaActual = 1;
    this.actualizarPaginasMostradas();
  }

  ultimaPagina() { //Se llama al seleccionar la última página
    this.paginaActual = this.calcularNumeroTotalPaginas();
    this.actualizarPaginasMostradas();
  }

  terminaPadron(){ //Se llama con el botón Aceptar
    if(this.tipo=='cuentasFueraRango'){
      console.log("Entra if fueraRango");
      //Cambia y envía valor de visible para mostrar componente con las estadisticas
      this.service.enviarVisible(3);
      this.router.navigate(['dashboard/municipios/selecMpio']); //Regresa al inicio
      
    }else{
      const visible = 1;
      this.service.enviarVisible(visible); //Mediante el servio envía los datos
      this.router.navigate(['dashboard/municipios/selecMpio']); //Regresa al inicio
    }
  }
    
  //Se usa para generar el archivo excel que genera el boton Exportar
  exportarCuentasRevision (){ //Se llama al dar click en botón Exportar
    //Consume API enviando el año en que se está trabajando
    this.service.cuentasFueraRango(this.numMpio, 2024).subscribe((data: Object )=>{
      //Al ser demasidas cuentas recibidas con varias propiedades, se hace uno de la interfaz Cuentas
      const padronData = data as Cuentas [];
      this.cuentas = padronData;
      this.generarArchivoExcel(); //Llama a la función que genera el archivo excel
    });
  }

  generarArchivoExcel() { //Genera el archivo y se llama en la función exportarPadron()
    // Crea una nueva instancia de Workbook
    const wb = XLSX.utils.book_new();
    
    const datos = [
      //Cabecera del archivo
      ['NO_CONTROL', 'MUNICIPIO', 'NO_CUENTA', 'TIPO_PREDIO', 'SUPERFICIE_TERRENO', 'VALOR_TERRENO', 'SUPERFICIE_CONSTRUCCION',
      'VALOR_CONSTRUCCION', 'SUPERFICIE_OBRA_COMP', 'VALOR_OBRA_COMP', 'BASE_GRAVABLE', 'IMPUESTO'],
      //Datos del servicio
      ...this.cuentas.map(cuenta => [cuenta.noControl, cuenta.NoMpio, cuenta.NoCuenta, cuenta.tipoCuenta, cuenta.superficieTerreno, cuenta.valorTerrenoCalculado,
        cuenta.superficieConstruccion, cuenta.valorConstruccionCalculado,cuenta.superficieObra, cuenta.valorObra, cuenta.baseGravableCalculada, cuenta.impuestoCalculado])
    ];
    const nombreHoja = 'FueraRango'; // Nombre de la hoja de trabajo
  
    // Convierte los datos en formato de hoja de cálculo de Excel
    const datosTabla = XLSX.utils.aoa_to_sheet(datos);
  
    // Agrega la hoja de trabajo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, datosTabla, nombreHoja);
  
    // Genera el archivo Excel
    const excelArchivo = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
    // Crea un Blob con el archivo Excel
    const blob = new Blob([excelArchivo], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Crea un objeto URL para el Blob
    const url = window.URL.createObjectURL(blob);
  
    // Crea un elemento <a> para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CuentasFueraRango.xlsx'; // Nombre del archivo Excel
    link.click();
  
    // Libera el objeto URL
    window.URL.revokeObjectURL(url);
  }
}

