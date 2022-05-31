import { Injectable } from "@angular/core";
import { DatePipe,registerLocaleData } from '@angular/common';
import { Usuario } from "./usuario";
import { Observable} from 'rxjs';
import { of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { throwError } from "rxjs";
import { Router } from '@angular/router';


@Injectable()

export class UsuarioService {
    
    private urlEndPoint:string =  'http://localhost:8080/api/usuarios';
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  

       constructor(private http: HttpClient, private router:Router) {
     
       };


    private isNoAutorizado(e):boolean {
      if(e.status==401 || e.status==403) {
        this.router.navigate(['/login'])
        return true;
      }
      return false;
    }

    getUsuarios(): Observable<Usuario[]> {
        //return of(CLIENTES);
        return this.http.get(this.urlEndPoint).pipe(
          tap(response => {
            let usuarios = response as Usuario[];
            console.log('UsuarioService: tap1')
            usuarios.forEach ( usuario => {
              console.log(usuario.nombre);
            }
            )
          }),
          map(response => {
            let usuarios = response as Usuario[];
            return usuarios.map(usuario => {
              usuario.nombre= usuario.nombre.toUpperCase();
              let datePipe = new DatePipe('es');
              return usuario;
            });
          }
        ),
        tap(response => {
          console.log('UsuarioService: tap2')
          response.forEach ( usuario => {
            console.log(usuario.nombre);
          }
          )
        })
        );
      }

    create(usuario: Usuario) : Observable<Usuario> {
        return this.http.post(this.urlEndPoint,usuario,{headers: this.httpHeaders}).pipe(
            map((response:any) => response.usuario as Usuario)
           
        )
    }
    getUsuario(id): Observable<Usuario>{
      return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)) {
            return throwError(e);
          }
          this.router.navigate(['/usuarios']);
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.mensaje,'error');
          return throwError(e);
        })
      );
    }
    
    delete(id: number): Observable<Usuario>{
      return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje,e.error.error, 'error');
          return throwError(e);
        })
      )
    }

    update(usuario: Usuario): Observable<any>{
      return this.http.put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario, {headers: this.httpHeaders}).pipe(
        catchError(e => {
          if(this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if(e.status==400){
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje,e.error.error,'error');
          return throwError(e);
    })
  );
  }
  
}