import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2';


import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit {
  //variables globales
  public usuario: Usuario = new Usuario();
  public errores: string[] = [];
  socialUser: SocialUser;
  isLoggedin: boolean = null;
  username: string;
  ImagePath: string;
  //inyectamos los sericios necesarios en el constructor
  constructor( private router: Router, private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService, private usuarioService: UsuarioService,) {
    this.usuario = new Usuario();
    this.ImagePath = '/assets/login-removebg-preview.png';
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(user => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      //al loguearse el usuario guardamos sus datos en el localStorage junto al token
      if (this.isLoggedin) {
        localStorage.setItem('token', JSON.stringify({ token: this.socialUser.authToken }));
        localStorage.setItem('user', JSON.stringify({ username: this.socialUser.email }));
        localStorage.setItem('name', JSON.stringify({ name: this.socialUser.name }));
        //se llama al metodo para registrar el usuario 
        this.create();
      }

    });



  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.router.navigate(['/']);
  }


  create(): void {
    //se setean los datos al usuario 
    this.usuario.nombre = this.socialUser.firstName;
    this.usuario.email = this.socialUser.email;
    this.usuario.password = "FACEBOOK";
    //se llama al servicio
    this.usuarioService.create(this.usuario)
      .subscribe(usuario => {
        if (usuario != undefined) {
          swal.fire('Nuevo cliente', `El cliente ${usuario.nombre} ha sido creado con exito`, 'success')
        }
        this.router.navigate(['/'])
      }, err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );
  }

}