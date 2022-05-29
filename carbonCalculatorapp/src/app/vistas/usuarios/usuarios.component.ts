import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2'
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html'
  })

  export class UsuariosComponent implements OnInit {
      usuarios: Usuario[];
      
      
      constructor(private usuarioService: UsuarioService) { }

      ngOnInit() { 
         this.usuarioService.getUsuarios().pipe(
          tap(usuarios => {
            this.usuarios = usuarios;
            console.log('UsuariosComponent: tap3')
            usuarios.forEach ( usuario => {
              console.log(usuario.nombre);
            });
          })
        ).subscribe(usuarios => this.usuarios = usuarios); 
      }
    
    delete(usuario: Usuario): void {
        swal.fire(
          "Good job!"
        ).then((result) => {
          if (result.value) {
    
            this.usuarioService.delete(usuario.id).subscribe(
              response => {
                this.usuarios = this.usuarios.filter(us => us !== usuario)
                swal.fire(
                  'Cliente Eliminado!',
                  `Cliente ${usuario.id} eliminado con éxito.`,
                  'success'
                )
              }
            )
    
          }
        })
      } 
    }
  