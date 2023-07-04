import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{ AuthService} from '../../service/auth.service'; //Llamar servicio para listado de municipios
import { DatosMpioService } from '../../service/datos-mpio.service';

import { Cuentas } from 'src/app/interface/cuentas.interface'; //Para uso de la interfaz
import * as XLSX from 'xlsx'; //Para generar excel


@Component({
  selector: 'app-seleccion-municipio',
  templateUrl: './seleccion-municipio.component.html',
  styleUrls: ['./seleccion-municipio.component.css']
})
export class SeleccionMunicipioComponent {
  
  constructor(private router: Router, private service: AuthService, private service2: DatosMpioService) {
    this.obtenerMunicipios();
  }

  visible:number=0;
  exportar:number=0;

  ngOnInit(){
    this.service2.visible$.subscribe((valor)=>{
      this.visible = valor; //Captura el valor recibido en la suscripción
    })

    this.service2.exportar$.subscribe((valor1)=>{
      this.exportar = valor1; //Captura valor recibido
    })
    this.exportar=1;
    console.log("Exportar desde seleccionMunicipio");
    console.log(this.exportar);
  }

  mpios:any; // variable para guardar lo que se recibe en la api
  municipios=[]
  auxNombreMpio=''; //Contiene nombre del municipio con número y coma
  nombreMpio='';//Guarda nombre del municipio para enviarlo al componente datos-municipio
  
  obtenerMunicipios(){ //Para obtener lista de municipios
    this.service.devuelveMpios().subscribe(data => { //Obtiene datos de la API
      this.mpios = data; //Guarda datos de la api en la variable
      this.municipios=this.mpios.listaDatos; //Almacena listaDatos en el arreglo municipios
      this.visible = 1; //Indica que se debe mostrar el cmponente padre (seleccion-municipios)
    })
  }

  seleccion(municipio:string) {
    this.visible=2; //Cambia valor para mostrar componente hijo (datos-mpio)
    this.nombreMpio=municipio; //Almacena el nombre del municipio
  }

  cuentas: Cuentas[] = [];
  exportarPadron (){
    this.service2.padronFacturaFinal(2024).subscribe((data: Object )=>{
      const padronData = data as Cuentas [];
      this.cuentas = padronData;
      this.generarArchivoExcel();
    });
  }

  generarArchivoExcel() {
    // Crea una nueva instancia de Workbook
    const wb = XLSX.utils.book_new();
    
    const data = [
      //Cabecera del archivo
      ['NO_CONTROL', 'MUNICIPIO', 'NO_CUENTA', 'TIPO_PREDIO', 'SUPERFICIE_TERRENO', 'VALOR_TERRENO', 'SUPERFICIE_CONSTRUCCION',
      'VALOR_CONSTRUCCION', 'SUPERFICIE_OBRA_COMP', 'VALOR_OBRA_COMP', 'BASE_GRAVABLE', 'IMPUESTO'],
      //Datos del servicio
      ...this.cuentas.map(cuenta => [cuenta.noControl, cuenta.NoMpio, cuenta.NoCuenta, cuenta.tipoCuenta, cuenta.superficieTerreno, cuenta.valorTerrenoCalculado,
        cuenta.superficieConstruccion, cuenta.valorConstruccionCalculado,cuenta.superficieObra, cuenta.valorObra, cuenta.baseGravableCalculada, cuenta.impuestoCalculado])
    ];
    const wsName = 'Cuentas'; // Nombre de la hoja de trabajo
  
    // Convierte los datos en formato de hoja de cálculo de Excel
    const ws = XLSX.utils.aoa_to_sheet(data);
  
    // Agrega la hoja de trabajo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, wsName);
  
    // Genera el archivo Excel
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
    // Crea un Blob con el archivo Excel
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Crea un objeto URL para el Blob
    const url = window.URL.createObjectURL(blob);
  
    // Crea un elemento <a> para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cuentas.xlsx'; // Nombre del archivo Excel
    link.click();
  
    // Libera el objeto URL
    window.URL.revokeObjectURL(url);
  }

}
