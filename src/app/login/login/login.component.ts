import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; //Validar formulario
import { Router } from '@angular/router'; //Redigir a otras vistas
import { ToastrService } from 'ngx-toastr'; //Generar alertas
import { AuthService } from '../../service/auth.service'; //Llama al servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) {
    sessionStorage.clear(); //Limpiar almacenamiento de la sesión
  }

  userdata: any; //variable para guardar los datos que se reciben de la api
  mpios: any; //Variable para guardar lo que se recibe en la api
  
  //Valida los campos del formulario login
  loginForm = this.builder.group({
    verssion: this.builder.control('1.0'),
    sistema: this.builder.control('SIPRE'),
    usuario: this.builder.control('', Validators.required),
    passwd: this.builder.control('', Validators.required)
  });

  capturaLogin() {
    if (this.loginForm.valid) {//Verifica que el formulario login sea válido
      this.service.consumeLogin(this.loginForm.value).subscribe(data => {
        this.userdata = data;
        if (this.userdata.mensaje == 'Inicio de sesión correcta') {
          sessionStorage.setItem('usuario', this.userdata.nombreCompleto); //Agregar nombre al almacenamiento de sesión
          sessionStorage.setItem('perfil', this.userdata.perfil); //Agrega perfil al amacenamiento de sesión
          this.router.navigate(['/dashboard/municipios/selecMpio']); //Mueve a la pagina que indica el router
          const nombreUsuario = this.userdata.nombreCompleto;
        } else {
          this.toastr.error('Verifique su información', 'Datos incorrectos'); //Estructura: 'Mensaje','Título'
        }
      })
    } else {
      this.toastr.warning('Faltan campos por llenar');
    }
  }

  descargarPDF(){ //Permite abirir el manual de usuario en otra ventana
    const rutaPDF = 'assets/manualUsuario.pdf'; //Indica la ruta en la que se encuentra el archivo
    window.open(rutaPDF, '_blank'); //_blank indica que la URL proporcionada debe abrirse en una nueva pestaña o ventana 

  }
}
