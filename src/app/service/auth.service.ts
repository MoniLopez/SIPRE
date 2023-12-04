import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiLogin = 'https://tramitesenlinea.ircep.gob.mx/ws/generalLogin/api/sparkle/initSesion/'

  consumeLogin(usuario: any) {
    return this.http.post(this.apiLogin, usuario);
  }

  sesionIniciada() { //Verifica que se haya iniciado sesion (Login)
    return sessionStorage.getItem('usuario') != null;
  }

  obtnerPerfil() {
    return sessionStorage.getItem('perfil') != null ? sessionStorage.getItem('perfil')?.toString() : '';
  }

  apiMunicipios = 'https://tramitesenlinea.ircep.gob.mx/ws/Simulador/SimiUnicor/listaMunicipios'

  devuelveMpios(){
    return this.http.post(this.apiMunicipios, 1);
  }
}
