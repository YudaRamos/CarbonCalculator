import { Injectable } from '@angular/core';
import{ViajeAvion} from './modelo/viaje.avion';
import{Huella} from './modelo/huella.calculada';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';
import {Observable, throwError,tap} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class VueloService {
  private urlEndPoint:string ='http://localhost:8080/climatic/huella';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient, private router: Router ) { }


  private isNoAutorizado(e): boolean {
  if(e.status== 401 || e.status == 403){
    this.router.navigate(['/login'])
    return true;
  }
  return false;
}

  calcularHuella(viaje:ViajeAvion): Observable<Huella>{
  return this.http.post(this.urlEndPoint,viaje, {headers: this.httpHeaders}).pipe(

    //convertimos lo que responde el post en el map a un objeto tipo Cliente
    map((response : any) => response as Huella),

      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        //si el error es en la validación
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire('Error al calcular', e.error.mensaje, 'error');
        return throwError(e);
      })
  );
}

}
