import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BitacoraService } from './bitacora.service';
import { pipe, tap } from 'rxjs';
import { Actividad } from './modelos/actividad';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  actividades: Actividad[] = [];
  public bitacoraService: BitacoraService;


  constructor(bitacoraService: BitacoraService) {
    this.bitacoraService = bitacoraService;
  }

  ngOnInit(): void {
    this.bitacoraService.getActividad().pipe(
      tap(actividades => this.actividades = actividades)
    ).subscribe(
      actividades => this.actividades = actividades
    );
  }

  

}
