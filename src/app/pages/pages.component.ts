import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'; //Redigir a otras vistas
import { DatosMpioService } from '../service/datos-mpio.service'; //Servicio para enviar valor de variable "visible"

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  constructor(private router: Router, private service: DatosMpioService) { }
 
  enviarVisible(){
    const visible = 1;
    this.service.enviarVisible(visible);
  }
}