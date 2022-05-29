import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import {FacebookLoginProvider,SocialAuthService} from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  titulo: string = 'Por favor Sign In!';
  usuario: Usuario;
  constructor(private authService: SocialAuthService) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }
  signIn() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'username o password vacías!', 'error');
      return;
    }
  }

}
