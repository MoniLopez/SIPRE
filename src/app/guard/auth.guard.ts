import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service'; //Llama al servicio
import { ToastrService } from 'ngx-toastr'; //Generar alertas
import { Router } from '@angular/router'; //Redigir a otras vistas

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router, private toastr: ToastrService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.sesionIniciada()) { //Si la sesión está iniciada continua normal
      return true;
    } else {
      //Si no está iniciada la sesión dirige al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
