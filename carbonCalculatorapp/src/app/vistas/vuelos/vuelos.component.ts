import { Component, OnInit } from '@angular/core';
import { Tramo } from './modelo/tramo';
import { Aeropuerto } from './modelo/aeropuerto';
import { ViajeAvion } from './modelo/viaje.avion';
import { Huella } from './modelo/huella.calculada';
import { Router, ActivatedRoute } from '@angular/router';

import { VueloService } from './vuelo.service';
import { AeropuertoService } from './aeropuerto.service';
import { tap } from 'rxjs/operators';

import swal from 'sweetalert2';
import { filter } from 'rxjs';

import { Actividad } from '../bitacora/modelos/actividadTPrivado';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {
  titulo: string = "Calcular huella para viaje en avión"
  tramo: Tramo = new Tramo();
  tramos: Tramo[] = [];
  viajes: ViajeAvion = new ViajeAvion();
  errores: string[] = [];
  aeropuertosOrigen: Aeropuerto[];
  aeropuertosDestino: Aeropuerto[];
  paisOrigen: String;
  paisDestino: String;
  aeropuertoOrigen: Aeropuerto = new Aeropuerto();
  aeropuertoDestino: Aeropuerto = new Aeropuerto();

  actividad: Actividad = new Actividad();
  today: Date = new Date();
  pipe = new DatePipe('en-EN');
  todayWithPipe = null;


  paises =
    [
      { name: 'Austria', code: 'AT' },
      { name: 'Bélgica', code: 'BE' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Croacia', code: 'HR' },
      { name: 'Chipre', code: 'CY' },
      { name: 'Republica Checa', code: 'CZ' },
      { name: 'Dinamarca', code: 'DK' },
      { name: 'Estonia', code: 'EE' },
      { name: 'Finlandia', code: 'FI' },
      { name: 'Francia', code: 'FR' },
      { name: 'Alemania', code: 'DE' },
      { name: 'Grecia', code: 'GR' },
      { name: 'Hungría', code: 'GU' },
      { name: 'Irlanda', code: 'IE' },
      { name: 'Italia', code: 'IT' },
      { name: 'Letonia', code: 'LV' },
      { name: 'Lituania', code: 'LT' },
      { name: 'Luxemburgo', code: 'LU' },
      { name: 'Malta', code: 'MT' },
      { name: 'Paises Bajos', code: 'NL' },
      { name: 'Polonia', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Romania', code: 'RO' },
      { name: 'Eslovaquia', code: 'SK' },
      { name: 'Eslovenia', code: 'SI' },
      { name: 'España', code: 'ES' },
      { name: 'Suecia', code: 'SE' },
      { name: 'Reino Unido', code: 'GB' }
    ];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private vueloService: VueloService, private aeropuertoService: AeropuertoService
  ) { }//

  ngOnInit(): void {
  }
  getAeropuertosO(event) {
    let changedValue = event.value;
    this.aeropuertoService.buscarPorPais(this.paisOrigen).pipe(//usamos el tap para asignar los datos al atributo cliente
      tap(aeropuertos => this.aeropuertosOrigen = aeropuertos))
      .subscribe(
      );
    console.log(this.aeropuertosOrigen);
    let domEvent = event.originalEvent;

  }
  getAeropuertosD(event) {
    let changedValue = event.value;
    this.aeropuertoService.buscarPorPais(this.paisDestino).pipe(//usamos el tap para asignar los datos al atributo cliente
      tap(aeropuertos => this.aeropuertosDestino = aeropuertos))
      .subscribe(
      );
    console.log(this.aeropuertosDestino);

    let domEvent = event.originalEvent;

  }



  public calcularVuelos(): void {
    this.viajes.legs = this.tramos;
    this.vueloService.calcularHuella(this.viajes)
      .subscribe(huella => {
        console.log(huella.co2e);
        console.log(huella.co2e_unit);
        this.actividad.consumo = huella.co2e;
        swal.fire('Huella generada', `La huella generada ha sido de ${huella.co2e} ${huella.co2e_unit}`, 'success')
      }
      );

  }

  public newTramo(): void {
    this.tramo = new Tramo();
  }

  public addTramo(): void {
    this.tramos.push(this.tramo);
    this.tramo = new Tramo();

      ;
  }

  delete(): void {
    this.tramos.splice(0,this.tramos.length);
  }
  public anadir(): void{
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.actividad.fecha = this.todayWithPipe;
    this.actividad.categoria = "Vuelo";
    console.log(this.actividad);
    this.vueloService.create(this.actividad).subscribe();
    swal.fire('','Actividad añadida correctamente', 'success')
  
  }

   
}
