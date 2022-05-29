import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';
import {Observable, throwError,tap} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { huellaGenerada } from './modelo/huella.generada';
import { electricidadConsumo } from './modelo/electricidad.consumo';
import { Actividad } from '../bitacora/modelos/actividadElectricidad';

@Injectable({
  providedIn: 'root'
})
export class ElectricidadService {
  private urlEndPoint:string ='http://localhost:8080/carbon/huella';
  private urlEndPointActividad:string ='http://localhost:8080/api/actividades';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient, private router: Router) { }

  
  private isNoAutorizado(e): boolean {
    if(e.status== 401 || e.status == 403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  calcularHuella(electricidad:electricidadConsumo): Observable<huellaGenerada>{
    return this.http.post(this.urlEndPoint,electricidad, {headers: this.httpHeaders}).pipe(
  
      //convertimos lo que responde el post en el map a un objeto tipo Cliente
      map((response : any) => response as huellaGenerada),
  
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

  //Para añadir nuestra activdad a nuestro array
  create(actividad: Actividad): Observable<Actividad>{
    return this.http.post(this.urlEndPointActividad, actividad, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.actividad as Actividad)
    );
  }
}
