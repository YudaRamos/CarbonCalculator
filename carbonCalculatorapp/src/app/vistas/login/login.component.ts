import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import swal from 'sweetalert2';

import { AuthServiceService } from './auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  titulo: string = 'Inicia sesión!';
  public usuario: Usuario = new Usuario();  
  public errores: string[] = [];
  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean = null;
  username: string;

  constructor(private authService: AuthServiceService, private router: Router, private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,private usuarioService: UsuarioService,) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(user => {
      this.socialUser = user;
      this.isLoggedin = (user != null);

      console.log(this.isLoggedin);
      if (this.isLoggedin) {
        console.log(this.socialUser.authToken);
        localStorage.setItem('token', JSON.stringify({ token: this.socialUser.authToken }));
        localStorage.setItem('user', JSON.stringify({ username: this.socialUser.email }));
        localStorage.setItem('name', JSON.stringify({ name: this.socialUser.name }));    
        
        this.create();
      }
    });
  
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);     
    this.router.navigate(['/']);
  }



  signOut(): void {
    this.socialAuthService.signOut();
    localStorage.clear();    
  }


  login(): void {
    console.log(this.usuario);
    if (this.usuario.nombre == null || this.usuario.password == null) {
      swal.fire('Error Login', 'username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      this.router.navigate(['/usuarios']);
      swal.fire('Login', `Hola ${response.nombre}, has iniciado sesion con exito`, 'success')
    })
  }

  create(): void {
    this.usuario.nombre=this.socialUser.firstName; 
    this.usuario.email=this.socialUser.email;
    this.usuario.password="FACEBOOK";
    this.usuarioService.create(this.usuario)
      .subscribe(usuario => {
        //this.router.navigate(['/usuarios'])
        swal.fire('Nuevo cliente', `El cliente ${usuario.nombre} ha sido creado con exito`, 'success')
        this.router.navigate(['/'])
      }/*,err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' +err.status);
        console.error(err.error.errors);
      }
       */
      
      );
  }

}