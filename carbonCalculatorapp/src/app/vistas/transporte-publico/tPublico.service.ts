import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ViajePublico } from './modelo/viaje.publico';
import { Response } from './modelo/response';
import { Actividad } from '../bitacora/modelos/actividadTPrivado';
@Injectable({
  providedIn: 'root'
})
export class transportePublico {
  private urlEndPoint: string = 'http://localhost:8080/carbonfootprint/transpublihuella';
  private urlEndPointActividad: string = 'http://localhost:8080/api/actividades?email=';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private httpPara = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }


  calcularHuella(viaje: ViajePublico): Observable<Response> {
    return this.http.get(this.urlEndPoint, {
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

  //Para añadir una actividad a la bitácora
  create(actividad: Actividad, email: string): Observable<Actividad> {
    return this.http.post(this.urlEndPointActividad + email, actividad, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.actividad as Actividad)
    );
  }

}
