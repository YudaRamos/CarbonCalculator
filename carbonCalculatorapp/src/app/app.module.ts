import { NgModule } from '@angular/core';
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
import {
  SocialAuthServiceConfig,
  SocialAuthService
} from 'angularx-social-login';
import { FacebookLoginProvider } from "angularx-social-login";
import { HomeComponent } from './vistas/home/home.component';
import { CochesComponent } from './vistas/coches/coches.component';
import { DropdownModule } from 'primeng/dropdown';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vuelos', component: VuelosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'coches', component: CochesComponent }


];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VuelosComponent,
    LoginComponent,
    HomeComponent,
    CochesComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule


  ],
  providers: [VueloService, {
    provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("733837861130211")
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig
  },
    SocialAuthService, AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
