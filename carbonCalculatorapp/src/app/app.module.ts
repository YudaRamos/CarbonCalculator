import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './vistas/header/header.component';
import { VuelosComponent } from './vistas/vuelos/vuelos.component';
import { FormsModule } from '@angular/forms';
import { VueloService } from './vistas/vuelos/vuelo.service';
import { AuthServiceService } from './vistas/login/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './vistas/login/login.component';

import { SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from "angularx-social-login";
import { SocialLoginModule } from 'angularx-social-login';




import { HomeComponent } from './vistas/home/home.component';
import { RegistroComponent } from './vistas/registro/registro.component';
import { CochesComponent } from './vistas/coches/coches.component';
import { DropdownModule } from 'primeng/dropdown';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';


import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransportePublicoComponent } from './vistas/transporte-publico/transporte-publico.component';
import { ElectricidadComponent } from './vistas/electricidad/electricidad.component';
import { SolucionesComponent } from './vistas/soluciones/soluciones.component';
import { CarouselModule } from 'primeng/carousel';
import { BitacoraComponent } from './vistas/bitacora/bitacora.component';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { UsuarioService } from './vistas/usuarios/usuario.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'vuelos', component: VuelosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'coches', component: CochesComponent },
  { path: 'electricidad', component: ElectricidadComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'transportePublico', component: TransportePublicoComponent },
  { path: 'electricidad', component: ElectricidadComponent },
  { path: 'soluciones', component: SolucionesComponent },
  { path: 'bitacora', component: BitacoraComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/form', component: RegistroComponent },
  { path: 'usuarios/form/:id', component: RegistroComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VuelosComponent,
    LoginComponent,
    HomeComponent,
    CochesComponent,
    TransportePublicoComponent,
    ElectricidadComponent,
    RegistroComponent,
    SolucionesComponent,
    BitacoraComponent,
    UsuariosComponent,



  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputNumberModule,
    ButtonModule,
    FieldsetModule,
    CarouselModule,
    SocialLoginModule



  ],
  providers: [VueloService, UsuarioService, {
    provide: LOCALE_ID, useValue: 'es'
  }, {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
           {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("734328851313343")
          }, 
          
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
    /*SocialAuthService, AuthServiceService*/],
  bootstrap: [AppComponent]
})
export class AppModule {

  
 }
