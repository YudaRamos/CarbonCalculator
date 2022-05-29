import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = `ZeroKhoi`;
  texto: string = "Iniciar Sesión";
  socialUser: SocialUser;
  isLoggedin: boolean = null;

  constructor(private socialAuthService: SocialAuthService, private router: Router) { }
  ngOnInit(): void {
    localStorage.clear();
    this.socialAuthService.authState.subscribe(user => {
      this.socialUser = user;
      this.isLoggedin = (user != null);

      console.log(this.isLoggedin);
      if (this.isLoggedin) {
        this.texto = "Cerrar sesión";

      } else {
        this.texto = "Iniciar Sesión";
        localStorage.clear();
      }
    });

  }


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
