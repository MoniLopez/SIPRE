import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatosMpioService } from '../../service/datos-mpio.service'; //Llama servicio que contiene los datos de tasas e incrementos
import { Router } from '@angular/router'; //Redigir a otras vistas


@Component({
  selector: 'app-datos-municipio',
  templateUrl: './datos-municipio.component.html',
  styleUrls: ['./datos-municipio.component.css']
})

export class DatosMunicipioComponent implements OnChanges{
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: DatosMpioService, private router: Router){
  }

  //Recibe datos provenientes del componente seleccion-municipio
  @Input() nombreMpio:string=''; //Recibe el nombre del municipio

  ngOnChanges(changes: SimpleChanges){ //Ciclo de vida del componente que es llamado después de que cambia una propiedad de entrada, en este caso, nombreMpio
    if(changes['nombreMpio']){
      var pos = this.nombreMpio.indexOf(','); //Regresa la posición de la coma
      this.numMpio = this.nombreMpio.substring(0,pos) //Contiene el número de municipio
      this.municipio = this.nombreMpio.substring(pos+2); //Almacena el nombre del municipio para mostrarlo en el título
      this.obtenerDatosServicio(); //Llama a la función que recibe datos de la API
    }
  }
  
  municipio=''; //Guarda nombre del municipio sin número y sin coma para imprimir
  numMpio=''; //Almacena numero de municipio
  objetoServicio:any; //Guarda toda la información obtenida en el servicio (table, table1 y table2)
  objetoAuxTasas=[] //Guarda temporalmente el objeto que contiene los objetos con valores de tasas
  objetoTasas:any;
  cadenaTasas=''; //Contiene la cadena con los valores de tasas
  objetoAuxIncrementos=[] //Guarda temporalmente el objeto que contiene los objetos con valores de incrementos
  objetoIncrementos:any;
  cadenaIncrementos=''; //Contiene la cadena con los valores de incrementos
  //Guarda cada valor de cada elemento de tasas
  urbanoT='';
  baldioT='';
  rusticoT='';
  suburbanoT='';
  industrialT='';
  canteraT='';
  //Guarda cada valor de cada elemento de incrementos
  urbanoI='';
  rusticoI='';
  construccionesI='';
  statusMpio=''; //Almacena lo que regresa el servicio de status por municipio
  mensajeValuacion='';
  visualizaPadron=0; //Para mostrar btnPadron
  //Guarda valores devueltos para generar estadisticas después de valuar
  objetoRustico: any;
  cadenaRustico='';
  totalCuentasRus='';
  anioAnteriorRus='';
  anioActualRus='';
  diferenciaRus='';
  porcentajeRus='';
  totalCuentasSub='';
  anioAnteriorSub='';
  anioActualSub='';
  diferenciaSub='';
  porcentajeSub='';
  totalCuentasUrb='';
  anioAnteriorUrb='';
  anioActualUrb='';
  diferenciaUrb='';
  porcentajeUrb='';

  //Almacena datos propuestos
  objetoAuxDatos=[];
  cadenaDatos='';
  objetoDatos:any;
  cuotaMinima='';
  rangoMax='';
  rangoMin='';


  obtenerDatosServicio()
  {
    var pos = this.nombreMpio.indexOf(','); //Regresa la posición de la coma
    this.numMpio = this.nombreMpio.substring(0,pos) //Contiene el número de municipio
    this.municipio = this.nombreMpio.substring(pos+2); //Almacena el nombre del municipio para mostrarlo en el título

    //Consume servicio para llenar tabla de Tasas e Incrementos
    this.service.obtenDatos(this.numMpio, 2023).subscribe(data =>{
      //Obtener datos de Tasas Actuales
      this.objetoServicio = data; //almacena los objetos que regresa el servicio obtenDatos
      this.objetoAuxTasas = this.objetoServicio.Table; //Guarda unicamente los objetos que pertenecen a Table(tasas)
      this.cadenaTasas = JSON.stringify(this.objetoAuxTasas); //Convierte en cadena los objetos
      this.objetoTasas = JSON.parse(this.cadenaTasas); //Converte la cadena en un objeto tipo JSON para poder usar sus indices (posición)
      this.urbanoT = this.objetoTasas[0].urbano;
      this.baldioT = this.objetoTasas[0].baldio;
      this.rusticoT = this.objetoTasas[0].rustico;
      this.suburbanoT = this.objetoTasas[0].suburbano;
      this.industrialT = this.objetoTasas[0].industrial;
      this.canteraT = this.objetoTasas[0].cantera;

      //Obtener datos de Incrementos Actuales
      this.objetoAuxIncrementos = this.objetoServicio.Table1;
      this.cadenaIncrementos = JSON.stringify(this.objetoAuxIncrementos);
      this.objetoIncrementos = JSON.parse(this.cadenaIncrementos);
      this.urbanoI = this.objetoIncrementos[0].IncrementoUrbano;
      this.rusticoI = this.objetoIncrementos[0].IncrementoRústico;
      this.construccionesI = this.objetoIncrementos[0].IncrementoConstrucciones;
    })

    //Consume servicio para obtener status del municipio
    this.service.verificaStatus(this.numMpio, 2023).subscribe(data1 => {
      this.objetoServicio = data1;
      this.statusMpio = this.objetoServicio[0].toUpperCase();
      //Si el status está en proceso muestra los datos que previamente se ingresaron
      if (this.statusMpio == 'PROCESO'){
        console.log(this.statusMpio);
        this.service.obtenDatos(this.numMpio, 2024).subscribe(data2=>{
          this.objetoServicio = data2; //almacena los objetos que regresa el servicio obtenDatos
          this.objetoAuxTasas = this.objetoServicio.Table; //Guarda unicamente los objetos que pertenecen a Table(tasas)
          this.cadenaTasas = JSON.stringify(this.objetoAuxTasas); //Convierte en cadena los objetos
          this.objetoTasas = JSON.parse(this.cadenaTasas); //Converte la cadena en un objeto tipo JSON para poder usar sus indices (posición)
          //Obtiene datos de tasas propuestass
          this.urbanoT = this.objetoTasas[0].urbano;
          this.baldioT = this.objetoTasas[0].baldio;
          this.rusticoT = this.objetoTasas[0].rustico;
          this.suburbanoT = this.objetoTasas[0].suburbano;
          this.industrialT = this.objetoTasas[0].industrial;
          this.canteraT = this.objetoTasas[0].cantera;
          //Obtener datos de Incrementos Propuestos
          this.objetoAuxIncrementos = this.objetoServicio.Table1;
          this.cadenaIncrementos = JSON.stringify(this.objetoAuxIncrementos);
          this.objetoIncrementos = JSON.parse(this.cadenaIncrementos);
          this.urbanoI = this.objetoIncrementos[0].IncrementoUrbano;
          this.rusticoI = this.objetoIncrementos[0].IncrementoRústico;
          this.construccionesI = this.objetoIncrementos[0].IncrementoConstrucciones;
          //Obtiene datos de Cuotas Propuestas
          this.objetoAuxDatos = this.objetoServicio.Table2;
          this.cadenaDatos = JSON.stringify(this.objetoAuxDatos);
          this.objetoDatos = JSON.parse(this.cadenaDatos); 
          this.cuotaMinima = this.objetoDatos[0].CuotaMinima;
          this.rangoMax = this.objetoDatos[0].rangoFinal;
          this.rangoMin = this.objetoDatos[0].rangoInicial;
          //Asigna los valores al input de las tablas
          this.tasasIncrementosForm.get('cuotaMinima')?.setValue(this.cuotaMinima);
          this.tasasIncrementosForm.get('inicial')?.setValue(this.rangoMin);
          this.tasasIncrementosForm.get('final')?.setValue(this.rangoMax);
          this.tasasIncrementosForm.get('urbanoCons')?.setValue(this.urbanoT);
          this.tasasIncrementosForm.get('urbanoBaldio')?.setValue(this.baldioT);
          this.tasasIncrementosForm.get('rustico')?.setValue(this.rusticoT);
          this.tasasIncrementosForm.get('suburbano')?.setValue(this.suburbanoT);
          this.tasasIncrementosForm.get('incrementoUrbano')?.setValue(this.urbanoI);
          this.tasasIncrementosForm.get('incrementoRustico')?.setValue(this.rusticoI);
          this.tasasIncrementosForm.get('incrementoConstrucciones')?.setValue(this.construccionesI);
        })
      }
      if (this.statusMpio == 'INICIAL'){
        this.tasasIncrementosForm.get('cuotaMinima')?.setValue('');
        this.tasasIncrementosForm.get('inicial')?.setValue('');
        this.tasasIncrementosForm.get('final')?.setValue('');
        this.tasasIncrementosForm.get('urbanoCons')?.setValue('');
        this.tasasIncrementosForm.get('urbanoBaldio')?.setValue('');
        this.tasasIncrementosForm.get('rustico')?.setValue('');
        this.tasasIncrementosForm.get('suburbano')?.setValue('');
        this.tasasIncrementosForm.get('incrementoUrbano')?.setValue('');
        this.tasasIncrementosForm.get('incrementoRustico')?.setValue('');
        this.tasasIncrementosForm.get('incrementoConstrucciones')?.setValue('');
      }
    })

    
    
  }

  //Valida los campos del formulario tasas e incrementos
  tasasIncrementosForm = this.builder.group({
    //this.tasasIncrementosForm.get('mpio').setValue(this.numMpio),
    idMunicipio: this.builder.control(1),
    anyo: this.builder.control(2024),
    valorRet: this.builder.control(0),
    cuotaMinima: this.builder.control('', Validators.compose([Validators.required, Validators.min(0)])),
    inicial: this.builder.control('', Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])),
    final: this.builder.control('', Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])),
    urbanoCons: this.builder.control('', Validators.compose([Validators.required, Validators.min(0), Validators.max(1)])),
    urbanoBaldio: this.builder.control('', Validators.compose([Validators.required, Validators.min(0), Validators.max(1)])),
    rustico: this.builder.control('', Validators.compose([Validators.required, Validators.min(0), Validators.max(1)])),
    suburbano: this.builder.control('', Validators.compose([Validators.required, Validators.min(0), Validators.max(1)])),
    industrial: this.builder.control('', Validators.compose([Validators.required, Validators.min(0), Validators.max(1)])),
    cantera: this.builder.control('', Validators.compose([Validators.required, Validators.min(0), Validators.max(1)])),
    incrementoUrbano: this.builder.control('', Validators.compose([Validators.required, Validators.min(1), Validators.max(2)])),
    incrementoRustico: this.builder.control('', Validators.compose([Validators.required, Validators.min(1), Validators.max(2)])),
    incrementoConstrucciones: this.builder.control('', Validators.compose([Validators.required, Validators.min(1), Validators.max(2)])),
    incrementoIndustrial: this.builder.control(1.5),
    incrementoCantera: this.builder.control(1.5)
  });

  verificarDatos(){
    /*if (this.tasasIncrementosForm.valid){ //Verificar que el formulario sea válido
      //Consume API para iniciar valuación
      this.service.valuarCuentas(this.tasasIncrementosForm.value).subscribe(data =>{
        this.objetoServicio=data;
        this.mensajeValuacion = this.objetoServicio.mensaje;
        console.log(this.mensajeValuacion);
        if (this.mensajeValuacion == "ok"){
          //Consume API para obtener estadistica
          this.service.generaEstadistica(this.numMpio, 2023).subscribe(data2 =>{
            this.objetoServicio = data2;
            console.log(this.objetoServicio);
            this.cadenaRustico=JSON.stringify(this.objetoServicio);
            console.log(this.cadenaRustico);
            this.objetoRustico=JSON.parse(this.cadenaRustico);
            this.totalCuentasRus=this.objetoRustico[0].totalCuentas;
            this.anioAnteriorRus=this.objetoRustico[0].impuestoActual;
            this.anioActualRus=this.objetoRustico[0].impuestoCalculado;
            this.diferenciaRus=this.objetoRustico[0].diferencia;
            this.porcentajeRus=this.objetoRustico[0].porcentaje;

            this.totalCuentasSub=this.objetoRustico[1].totalCuentas;
            this.anioAnteriorSub=this.objetoRustico[1].impuestoActual;
            this.anioActualSub=this.objetoRustico[1].impuestoCalculado;
            this.diferenciaSub=this.objetoRustico[1].diferencia;
            this.porcentajeSub=this.objetoRustico[1].porcentaje;

            this.totalCuentasUrb=this.objetoRustico[2].totalCuentas;
            this.anioAnteriorUrb=this.objetoRustico[2].impuestoActual;
            this.anioActualUrb=this.objetoRustico[2].impuestoCalculado;
            this.diferenciaUrb=this.objetoRustico[2].diferencia;
            this.porcentajeUrb=this.objetoRustico[2].porcentaje;
          })
        }
      })
    }else{
      //this.toastr.error('Verifique su información', 'Datos incorrectos'); 
      this.toastr.warning('Todos los campos deben estar llenos con números positivos', 'Verificar informacion'); //Estructura: 'Mensaje','Título'
    }*/
  }

  guardaTasasIncrementos(){
    this.router.navigate(['dashboard/municipios/padronPredial']); //Mueve a la pagina que indica el router
  }
}
