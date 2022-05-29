import { Injectable } from '@angular/core';;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ListaAeropuertos } from './modelo/lista.aeropuertos';
import { Aeropuerto } from './modelo/aeropuerto';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AeropuertoService {

  private urlEndPoint: string = 'http://localhost:8080/aeropuertos/pais/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

 

  /*getAeropuertos():Observable<Aeropuerto[]>{
    return this.http.get(this.urlEndPoint).pipe(
      //usamos el operador map del observable para cambiar los datos del listado clientes
    map( response => {
      let aeropuertos = response as Aeropuerto[];
      //usamos el metodo map del listado clientes para modificar sus valores internos
      return aeropuertos;
    }),
    
    );
  }*/

  buscarPorPais(pais:String): Observable<Aeropuerto[]>{
    return this.http.get(this.urlEndPoint+pais, {headers: this.httpHeaders}).pipe(
  
      //convertimos lo que responde el post en el map a un objeto tipo Cliente
      map((response : any) => response as Aeropuerto[]),
  
        catchError(e => {        
  
          //si el error es en la validación
          if(e.status==400){
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire('Error al buscar aeropuertos', e.error.mensaje, 'error');
          return throwError(e);
        })
    );
  }
}
