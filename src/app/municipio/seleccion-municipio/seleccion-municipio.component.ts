import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{ AuthService} from '../../service/auth.service'; //Llamar servicio para listado de municipios
import { DatosMpioService } from '../../service/datos-mpio.service'; //Contiene los servicios usados en este componente
import { Cuentas } from 'src/app/interface/cuentas.interface'; //Para uso de la interfaz con la que almacenan los datos recibidos de la API
import * as XLSX from 'xlsx'; //Para generar archivo excel
import { ToastrService } from 'ngx-toastr'; //Para usar alertas de Toastr


@Component({
  selector: 'app-seleccion-municipio',
  templateUrl: './seleccion-municipio.component.html',
  styleUrls: ['./seleccion-municipio.component.css']
})
export class SeleccionMunicipioComponent {
  
  constructor(private router: Router, private service: AuthService, private service2: DatosMpioService, private toastr: ToastrService) {
    
  }

  visible:number=0; //Se usa para mostrar o no algunos componentes
  
  ngOnInit(){
    this.obtenerMunicipios(); //Llama función para mostrar botones con municipios
    //Al iniciar el componente recibe el valor de visible enviado por otros componente para determinar en el html cuál componente mostrar
    this.service2.visible$.subscribe((valor)=>{
      this.visible = valor; //Captura el valor recibido en la suscripción
    })
  }

  mpios:any; //Guarda lo que se recibe en la API
  municipios=[] //Arreglo para municipios
  auxNombreMpio=''; //Contiene nombre del municipio con número y coma
  nombreMpio='';//Guarda nombre del municipio para enviarlo al componente datos-municipio
  objetoServicio: any; //Recibe datos del servicio
  numMpio=''; //Almacena numero de municipio
  municipio='' //Tiene el nombre del municipio

  obtenerMunicipios(){ //Para obtener lista de municipios, se llama al inicia el componente en ngOninit
    this.service.devuelveMpios().subscribe(data => { //Obtiene datos de la API
      this.mpios = data; //Guarda datos de la API en la variable mpios
      this.municipios=this.mpios.listaDatos; //Almacena listaDatos en el arreglo municipios
      this.visible = 1; //Indica que se debe mostrar el cmponente padre (seleccion-municipios)
    })
  }

  //Se llama al seleccionar el botón de un municipio
  seleccion(mpio:string) {
    this.nombreMpio=mpio; //Almacena el nombre del municipio
    var pos = this.nombreMpio.indexOf(','); //Regresa la posición de la coma
    this.numMpio = this.nombreMpio.substring(0,pos) //Contiene el número de municipio
    this.municipio = this.nombreMpio.substring(pos+2); //Almacena el nombre del municipio para mostrarlo en el título
    //Consume servicio para obtener status del municipio
    this.service2.verificaStatus(this.numMpio, 2024).subscribe(data1 => {
      this.objetoServicio = data1;
      var statusMpio = this.objetoServicio[0].toUpperCase();
      if(statusMpio == 'TERMINADO'){
        this.toastr.warning('Este municipio ya fue valuado', 'ESTADO: TERMINADO'); 
        this.router.navigate(['dashboard/municipios/padronPredial', this.numMpio, this.municipio]); //Mueve a la pagina que indica el router
      }
      else{
        this.visible=2; //Cambia valor para mostrar componente hijo (datos-mpio)
      }
    })
  }

  //Se usa para generar el archivo excel que genera el boton Exportar
  cuentas: Cuentas[] = []; //Guarda los datos recibidos de la API de las cuentas valuadas, es de tipo interfaz
  exportarPadron (){ //Se llama al dar click en botón Exportar
    //Consume API enviando el año en que se está trabajando
    this.service2.padronFacturaFinal(2024).subscribe((data: Object )=>{
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
    const nombreHoja = 'Cuentas'; // Nombre de la hoja de trabajo
  
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
    link.download = 'padronFactura.xlsx'; // Nombre del archivo Excel
    link.click();
  
    // Libera el objeto URL
    window.URL.revokeObjectURL(url);
  }

}
