import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Actividad } from './modelos/actividad';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import {  DatePipe } from '@angular/common';
import { FacebookTokenResponse } from './modelos/data';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  private urlEndPoint: string = 'http://localhost:8080/api/actividades';
  private urlEndPointV: string = 'http://localhost:8080/api/valid?token=';
  private fields: string= '&fields='
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

 
  getActividad(): Observable<Actividad[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let actividades = response as Actividad[];
        return actividades.map(actividad => {
          let datePipe = new DatePipe('es');  

          actividad.fecha = datePipe.transform(actividad.fecha,'EEE dd/MMM/yyyy');
          return actividad;
        })
      })
    );
  }


  validate(token: string, fields:string): Observable<FacebookTokenResponse> {
    return this.http.get(this.urlEndPointV+token+this.fields+fields).pipe(
      map(response => response as FacebookTokenResponse)
    );
  }


  create(actividad: Actividad): Observable<Actividad> {
    return this.http.post(this.urlEndPoint, actividad, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.actividad as Actividad)
    );
  }


  delete(id: number): Observable<Actividad> {
    return this.http.delete<Actividad>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
  }

}
