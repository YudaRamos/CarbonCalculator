import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuario: Usuario = new Usuario();  
  public errores: string[] = [];

  constructor(private usuarioService: UsuarioService,
    private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario()
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.usuarioService.getUsuario(id).subscribe( (usuario) => this.usuario = usuario)
      }
    })
  }

  create(): void {
    this.usuarioService.create(this.usuario)
      .subscribe(usuario => {
        //this.router.navigate(['/usuarios'])
        Swal.fire('Nuevo cliente', `El cliente ${usuario.nombre} ha sido creado con exito`, 'success')
        this.router.navigate(['/'])
      },
      err => {
        this.errores = err.error.errors as string[];
        //console.error('Codigo del error desde el backend: ' +err.status);
        //console.error(err.error.errors);
        Swal.fire('Error', "Ups! algo ha ido mal", 'error')
      }
      );
  }

  update():void{
    this.usuarioService.update(this.usuario)
    .subscribe( json => {
      this.router.navigate(['/usuarios'])
      Swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.usuario.nombre} `, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Codigo del error desde el backend: ' +err.status);
      console.error(err.error.errors);
    }
    )
  }

  

}
