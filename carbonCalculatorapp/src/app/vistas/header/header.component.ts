import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})
export class HeaderComponent implements OnInit {
  title: string = `CarbonCalculator`;
  texto: string = "Iniciar Sesión";
  socialUser: SocialUser;
  isLoggedin: boolean = null;

  constructor(private socialAuthService: SocialAuthService, private router: Router) { }
  //al cargar la página vaciamos el localstorage
  ngOnInit(): void {
    localStorage.clear();
    this.socialAuthService.authState.subscribe(user => {
      this.socialUser = user;
      this.isLoggedin = (user != null);

      if (this.isLoggedin) {
        this.texto = "Cerrar sesión";

      } else {
        this.texto = "Iniciar Sesión";
        localStorage.clear();
      }
    });

  }

//al clicar en el enlace de cerrar sesion limpiamos el localstorage
  cerrarSesion(): void {
    if (this.texto == "Cerrar sesión") {
      this.signOut();
    }
  }

  signOut(): void {
    this.socialAuthService.signOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
