import { Component, Input, OnInit, Output } from '@angular/core';
import { DatosMpioService } from '../../service/datos-mpio.service'; //Llama servicio que contiene los datos de tasas e incrementos
import { Router } from '@angular/router'; //Redigir a otras vistas
import { ToastrService } from 'ngx-toastr'; //Para usar alertas de Toastr

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit{
  constructor(private service: DatosMpioService, private router: Router, private toastr: ToastrService){}
  
  //Recibe datos provenientes del componente seleccion-municipio
  @Input() nombreMpio:string=''; //Recibe el nombre del municipio

  municipio=''; //Guarda nombre del municipio sin número y sin coma
  numMpio=''; //Almacena numero de municipio

  objetoServicio: any; //Recibe datos propuestos
  objRustico: any;//Tiene valores de estadisticas de cuentas rusticas
  objSuburbano: any;//Tiene valores de estadisticas de cuentas rusticas
  objUrbano: any;//Tiene valores de estadisticas de cuentas rusticas

  mensajeValuacion=''; //Contiene el mensaje recibido por la API

  ngOnInit(){
    var pos = this.nombreMpio.indexOf(','); //Regresa la posición de la coma
    this.municipio = this.nombreMpio.substring(pos+2); //Almacena el nombre del municipio para mostrarlo en el título
    this.numMpio = this.nombreMpio.substring(0,pos) //Contiene el número de municipio
    
    //Consume API para obtener estadistica
    this.service.generaEstadistica(this.numMpio, 2023).subscribe(data2 =>{
      this.objetoServicio = data2;
      this.objRustico = this.objetoServicio[0];
      this.objSuburbano= this.objetoServicio[1];
      this.objUrbano = this.objetoServicio[2];
    })
  }

  //Se llama en el botón Revaluar
  regresaValuacion(){ 
    //Cambia el valor de visible para ahora mostrar el componente datos-municipio con los datos que llenó el usuario
    const visible = 2;
    this.service.enviarVisible(visible);
  }

  //Se llama al seleccionar el botón Continuar del modalGuardar
  guardaTasasIncrementos(){
    //Consume API para cambio de status
    this.service.terminaValuacion(this.numMpio, 2024).subscribe(data =>{
      this.objetoServicio=data;
      this.mensajeValuacion=this.objetoServicio.mensaje
      //Condicional para manejo de error al hacer cambio de status
      if(this.mensajeValuacion == 'ok'){
        this.router.navigate(['dashboard/municipios/padronPredial', this.numMpio, this.municipio]); //Mueve a la pagina que indica el router
      }
      else{
        console.log(this.mensajeValuacion);
        this.toastr.warning('No se pudo hacer cambio de status');
      }
    });
  } 
}