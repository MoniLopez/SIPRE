import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{ AuthService} from '../../service/auth.service'; //Llamar servicio para listado de municipios
import { DatosMunicipioComponent } from '../datos-municipio/datos-municipio.component';
import { DatosMpioService } from '../../service/datos-mpio.service'; 


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
}
