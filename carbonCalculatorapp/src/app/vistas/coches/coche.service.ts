import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ViajeCoche } from './modelo/viaje.coche';
import { ViajeMoto } from './modelo/viaje.moto';
import { Response } from './modelo/response';
import { Actividad } from '../bitacora/modelos/actividadTPrivado';
@Injectable({
  providedIn: 'root'
})
export class CocheService {
  private urlEndPoint: string = 'http://localhost:8080/carbonfootprint/cocheshuella';
  private urlEndPointMoto: string = 'http://localhost:8080/carbonfootprint/motoshuella';
  private urlEndPointActividad: string = 'http://localhost:8080/api/actividades?email=';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private httpPara = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }


  calcularHuella(viaje: ViajeCoche): Observable<Response> {
    return this.http.get(this.urlEndPoint, {
      headers: this.httpHeaders,
      params: {
        vehicle: viaje.vehicle,
        distance: viaje.distance
      }

    }).pipe(map((response: any) => response as Response),
      catchError(e => {
        //si el error es en la validación
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire('Error al calcular', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  calcularHuellaMotos(viaje: ViajeMoto): Observable<Response> {
    return this.http.get(this.urlEndPointMoto, {
      headers: this.httpHeaders,
      params: {
        type: viaje.type,
        distance: viaje.distance
      }

    }).pipe(map((response: any) => response as Response),
      catchError(e => {
        //si el error es en la validación
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire('Error al calcular', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  create(actividad: Actividad, email: string): Observable<Actividad> {
    return this.http.post(this.urlEndPointActividad + email, actividad, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.actividad as Actividad)
    );
  }
}
