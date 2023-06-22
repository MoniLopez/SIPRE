import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosMpioService {

  constructor(private http: HttpClient) { }
  regresaDatosAnterior ='http://192.168.1.147:5042/SimiUnicor/IniciaMunicipios/'
  obtenerStatusMpio='http://192.168.1.147:5042/SimiUnicor/StatusMunicipios/'
  limpiarValuar='http://192.168.1.147:5042/SimiUnicor/LmpCalcMunicipios/'
  
  //Se usará en los componentes para mostrar o no el componente datos-municipio 
  private visibleServicio = new Subject<number>(); //Utiliza un Subject para enviar y recibir datos
  visible$ = this.visibleServicio.asObservable(); //Expone un observable para suscribirse al valor
  enviarVisible(visible: number){
    this.visibleServicio.next(visible); //Envía el valor a través del Subject
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
}
