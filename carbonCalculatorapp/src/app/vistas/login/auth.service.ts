import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
  login(usuario: Usuario): Observable<any> {
    //url del api para el recurso autenticacion
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    //credenciales encriptadas con btoa
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });

  }
}
