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

  municipio=''; //Guarda nombre del municipio sin número y sin coma para imprimir
  numMpio=''; //Almacena numero de municipio

  ngOnChanges(changes: SimpleChanges){ //Ciclo de vida del componente que es llamado después de que cambia una propiedad de entrada, en este caso, nombreMpio
    if(changes['nombreMpio']){
      var pos = this.nombreMpio.indexOf(','); //Regresa la posición de la coma
      this.numMpio = this.nombreMpio.substring(0,pos) //Contiene el número de municipio
      this.municipio = this.nombreMpio.substring(pos+2); //Almacena el nombre del municipio para mostrarlo en el título
      this.obtenerDatosServicio(); //Llama a la función que recibe datos de la API
      
    }
  }
  
  objetoServicio: any; //Recibe datos del servicio
  objServicioTI:any; //Guarda toda la información obtenida en el servicio (table, table1 y table2)
  
  objAuxTasas=[] //Guarda temporalmente el objeto que contiene los objetos con valores de tasas
  objTasas:any; //Almacena los valores de tasas del municipio seleccionado
  
  objAuxIncrementos=[] //Guarda temporalmente el objeto que contiene los objetos con valores de incrementos
  objIncrementos:any; //Almacena los valores de incrementos del municipio seleccionado
  
  statusMpio=''; //Almacena lo que regresa el servicio de status por municipio
  mensajeValuacion='';
  visualizaPadron=0; //Para mostrar btnPadron
  
  //Almacena datos propuestos
  objAuxTasasP=[]
  objTasasP:any;

  objAuxIncrementosP=[]
  objIncrementosP:any;

  objAuxDatos=[];
  objDatos:any;

  obtenerDatosServicio()
  {
    //Consume servicio para llenar tabla de Tasas e Incrementos
    this.service.obtenDatos(this.numMpio, 2023).subscribe(data =>{
      //Obtener datos de Tasas Actuales
      this.objServicioTI = data; //almacena los objetos que regresa el servicio obtenDatos
      this.objAuxTasas = this.objServicioTI.Table; //Guarda unicamente los objetos que pertenecen a Table(tasas)
      this.objTasas = this.objAuxTasas[0]; //Pasa a objTasas para poder imprimir datos en la tabla
      
      //Obtener datos de Incrementos Actuales
      this.objAuxIncrementos = this.objServicioTI.Table1;
      this.objIncrementos = this.objAuxIncrementos[0];
    })

    //Consume servicio para obtener status del municipio
    this.service.verificaStatus(this.numMpio, 2023).subscribe(data1 => {
      this.objetoServicio = data1;
      this.statusMpio = this.objetoServicio[0].toUpperCase();
      //Si el status está en proceso muestra los datos que previamente se ingresaron
      if (this.statusMpio == 'PROCESO' || this.statusMpio == 'TERMINADO'){
        //Consume API para mostrar los valores propuestos por el usuario
        this.service.obtenDatos(this.numMpio, 2024).subscribe(data2=>{
          this.objetoServicio = data2; //almacena los objetos que regresa el servicio obtenDatos
          //Obtiene datos de tasas propuestas
          this.objAuxTasasP = this.objetoServicio.Table; 
          this.objTasasP = this.objAuxTasasP[0];
          //Obtiene datos de incrementos propuestas
          this.objAuxIncrementosP = this.objetoServicio.Table1; 
          this.objIncrementosP = this.objAuxIncrementosP[0];
          //Obtiene datos de Cuotas Propuestas
          this.objAuxDatos = this.objetoServicio.Table2;
          this.objDatos = this.objAuxDatos[0];
          //Asigna los valores al input de las tablas
          this.tasasIncrementosForm.get('cuotaMinima')?.setValue(this.objDatos.CuotaMinima);
          this.tasasIncrementosForm.get('inicial')?.setValue(this.objDatos.rangoInicial);
          this.tasasIncrementosForm.get('final')?.setValue(this.objDatos.rangoFinal);

          this.tasasIncrementosForm.get('urbanoCons')?.setValue(this.objTasasP.urbano);
          this.tasasIncrementosForm.get('urbanoBaldio')?.setValue(this.objTasasP.baldio);
          this.tasasIncrementosForm.get('rustico')?.setValue(this.objTasasP.rustico);
          this.tasasIncrementosForm.get('suburbano')?.setValue(this.objTasasP.suburbano);
          this.tasasIncrementosForm.get('industrial')?.setValue(this.objTasasP.industrial);
          this.tasasIncrementosForm.get('cantera')?.setValue(this.objTasasP.cantera);
          
          this.tasasIncrementosForm.get('incrementoUrbano')?.setValue(this.objIncrementosP.IncrementoUrbano);
          this.tasasIncrementosForm.get('incrementoRustico')?.setValue(this.objIncrementosP.IncrementoRustico);
          this.tasasIncrementosForm.get('incrementoConstrucciones')?.setValue(this.objIncrementosP.IncrementoConstrucciones);
          this.tasasIncrementosForm.get('incrementoIndustrial')?.setValue(this.objIncrementosP.IncrementoIndustrial);
          this.tasasIncrementosForm.get('incrementoCantera')?.setValue(this.objIncrementosP.IncrementoCantera);
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
        this.tasasIncrementosForm.get('industrial')?.setValue('');
        this.tasasIncrementosForm.get('cantera')?.setValue('');
        this.tasasIncrementosForm.get('incrementoUrbano')?.setValue('');
        this.tasasIncrementosForm.get('incrementoRustico')?.setValue('');
        this.tasasIncrementosForm.get('incrementoConstrucciones')?.setValue('');
        this.tasasIncrementosForm.get('incrementoIndustrial')?.setValue('');
        this.tasasIncrementosForm.get('incrementoCantera')?.setValue('');
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
    incrementoIndustrial: this.builder.control('', Validators.compose([Validators.required, Validators.min(1), Validators.max(2)])),
    incrementoCantera: this.builder.control('', Validators.compose([Validators.required, Validators.min(1), Validators.max(2)]))
  });

  verificarDatos(){
      if (this.tasasIncrementosForm.valid){ //Verificar que el formulario sea válido
      //Consume API para iniciar valuación
      this.service.valuarCuentas(this.tasasIncrementosForm.value).subscribe(data =>{
        this.objetoServicio=data; //Guarda datos recibidos de la API
        this.mensajeValuacion = this.objetoServicio.mensaje;
        console.log(this.mensajeValuacion);
        //Cambia y envía valor de visible para mostrar componente con las estadisticas
        const visible = 3; 
        this.service.enviarVisible(visible);
        if (this.mensajeValuacion == "ok"){
          //Mostrar estadisticas
          /*const visible = 3; 
          this.service.enviarVisible(visible);*/
        }
        else{
          this.toastr.error('No se puedo hacer valuación');
        }
      })
    }else{
      //this.toastr.error('Verifique su información', 'Datos incorrectos'); 
      this.toastr.warning('Todos los campos deben estar llenos con números positivos. Los incrementos deben ser mayor a 1', 'Verificar informacion'); //Estructura: 'Mensaje','Título'
    }
  }
}