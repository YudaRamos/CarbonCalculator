import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';
import {Observable, throwError,tap} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { ViajeCoche } from './modelo/viaje.coche';
import { Response } from './modelo/response';
@Injectable({
  providedIn: 'root'
})
export class CocheService {
  private urlEndPoint:string ='http://localhost:8080/carbonfootprint/cocheshuella';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  private httpPara = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean {
  if(e.status== 401 || e.status == 403){
    this.router.navigate(['/login'])
    return true;
  }
  return false;
}

  calcularHuella(viaje:ViajeCoche): Observable<Response>{
  return this.http.get(this.urlEndPoint,{
    headers: this.httpHeaders,
    params:{vehicle:viaje.vehicle,
    distance:viaje.distance}

  }).pipe(

    //convertimos lo que responde el post en el map a un objeto tipo Cliente
    map((response : any) => response as Response),

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
