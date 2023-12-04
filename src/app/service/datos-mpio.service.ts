import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosMpioService {

  constructor(private http: HttpClient) { }
  regresaDatosAnterior ='https://tramitesenlinea.ircep.gob.mx/ws/Simulador/SimiUnicor/IniciaMunicipios/'
  obtenerStatusMpio='https://tramitesenlinea.ircep.gob.mx/ws/Simulador/SimiUnicor/StatusMunicipios/'
  limpiarValuar='https://tramitesenlinea.ircep.gob.mx/ws/Simulador/SimiUnicor/LmpCalcMunicipios/'
  estadisticaMpio='https://tramitesenlinea.ircep.gob.mx/ws/Simulador/SimiUnicor/ReporteUno/'
  cambioStatus='https://tramitesenlinea.ircep.gob.mx/ws/Simulador/SimiUnicor/FinalizaCalculo/'
  padronMpio= 'https://tramitesenlinea.ircep.gob.mx/ws/Simulador/SimiUnicor/ReporteDos/'
  padronFactura='https://tramitesenlinea.ircep.gob.mx/ws/Simulador/SimiUnicor/ReporteFinal/'
  fueraRango='https://tramitesenlinea.ircep.gob.mx/ws/Simulador/SimiUnicor/ReporteFueraRango/'
  
  //Se usará en los componentes para mostrar o no el componente datos-municipio 
  private visibleServicio = new Subject<number>(); //Utiliza un Subject para enviar y recibir datos
  visible$ = this.visibleServicio.asObservable(); //Expone un observable para suscribirse al valor
  enviarVisible(visible: number){
    this.visibleServicio.next(visible); //Envía el valor a través del Subject
  }

   //Se usará para habiliar el boton Exportar una vez finalizada la valuación de todos los municipios
   private exportarServicio = new Subject<number>(); //Utiliza un Subject para enviar y recibir datos
   exportar$ = this.exportarServicio.asObservable(); //Expone un observable para suscribirse al valor
   enviarExportar(exportar: number){
     this.exportarServicio.next(exportar); //Envía el valor a través del Subject
   }

  //API que devuelve info. de tasas e incrementos del ejercicio anterior
  obtenDatos (mpio: string, anio: number){
    return this.http.post(this.regresaDatosAnterior+mpio+'/'+anio, 1);
  }

  //API para obtener el status del municipio que se está consultando
  verificaStatus (mpio: string, anio: number){
    return this.http.post(this.obtenerStatusMpio+mpio+'/'+anio, 1);
  }

  //API para limpiar las cuentas que no serán valuadas y generar la valuación
  valuarCuentas (datosMpio:any){
    return this.http.post(this.limpiarValuar, datosMpio);
  }

  //API para obtener estadisticas de la valuación
  generaEstadistica(mpio:string, anio:number){
    return this.http.post(this.estadisticaMpio+mpio+'/'+anio, 1)

  }

  //API para cambiar status del mpio a TERMINADO
  terminaValuacion(mpio: string, anio: number){
    return this.http.post(this.cambioStatus+mpio+'/'+anio, 1);
  }

  //API para obtener cuentas valuadas por municipio
  valuacionMunicipio(mpio: string, anio: number){
    return this.http.post(this.padronMpio+mpio+'/'+anio, 1);
  }

  //API para obtener cuentas valuadas de todos los municipios de ese año
  padronFacturaFinal(anio: number){
    return this.http.post(this.padronFactura+anio, 1);
  }

  //API para obtener cuentas valuadas por municipio
  cuentasFueraRango(mpio: string, anio: number){
    return this.http.post(this.fueraRango+mpio+'/'+anio, 1);
  }

}
