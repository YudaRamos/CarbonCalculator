import { Component, OnInit } from '@angular/core';
import { BitacoraService } from './bitacora.service';
import {  tap } from 'rxjs';
import { Actividad } from './modelos/actividad';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html'

})
export class BitacoraComponent implements OnInit {

  actividades: Actividad[] = [];
  public bitacoraService: BitacoraService;
  randomItem: string;
  consejos: string;

  soluciones = ["Muchos trayectos no justifican el uso del automóvil donde viajan una o dos personas.  Si puedes, coge transporte público o viaja en grupo.  Si puedes, en vez de coger el taxi, vete andando o en bicicleta.",
  "Busca un estilo de viaje que tenga algo más que ofrecer no solamente para ti, sino también para la comunidad  local que visites y para el medioambiente.  Utiliza proveedores que ayuden a proteger el medioambiente. Busca excursiones con valor añadido.  Por ejemplo, puedes ir a plantar árboles durante tu viaje, ayudar a quitar basura de la naturaleza, etc.",
  "El ferrocarril es el modo de transporte de viajeros y de mercancías que presenta un menor impacto ambiental en su conjunto, es el modo que menos energía consume por unidad transportada, que presenta unos menores niveles de emisiones de CO2",
  "Un kilómetro recorrido en transporte público es mucho menos contaminante que uno recorrido en un vehículo particular.",
  "Los vehículos de combustión a gas generan un 25 % menos emisiones que los vehículos a gasolina, y un 9 % menos que los diésel.",
  "Búsqueda de las mejores rutas, más directas y que supongan menos kilómetros",
  "Tradicionales, eléctricas, plegables… ¡Hay para todos los gustos! Este medio de transporte no solo es ecológico, sino que además es realmente beneficioso para la salud. Moverse en estos transportes es eficaz, sostenible y sano. En definitiva, una gran opción para proporcionar una compensación al planeta."
];
  constructor(bitacoraService: BitacoraService,private cdRef: ChangeDetectorRef) {
    this.bitacoraService = bitacoraService;
    this.consejos = '/assets/consejos-removebg-preview.png';
  }

  ngOnInit(): void {
    this.bitacoraService.getActividad().pipe(
      tap(actividades => this.actividades = actividades)
    ).subscribe(
      actividades => this.actividades = actividades
    );
  }

  textoAleatorio() {
    this.randomItem = this.soluciones[Math.floor(Math.random() * this.soluciones.length)];
    return this.randomItem;
  }


  ngAfterViewChecked() {   
    this.randomItem = this.textoAleatorio();
    this.cdRef.detectChanges();

  }
  

}
