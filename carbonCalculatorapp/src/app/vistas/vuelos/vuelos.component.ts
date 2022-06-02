import { Component, OnInit } from '@angular/core';
import { Tramo } from './modelo/tramo';
import { Aeropuerto } from './modelo/aeropuerto';
import { ViajeAvion } from './modelo/viaje.avion';
import { Router, ActivatedRoute } from '@angular/router';
import { VueloService } from './vuelo.service';
import { AeropuertoService } from './aeropuerto.service';
import { tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import swal from 'sweetalert2';
import { Actividad } from '../bitacora/modelos/actividadTPrivado';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html'
  
})
export class VuelosComponent implements OnInit {
  //variables globales
  titulo: string = "Calcular huella para viaje en avión"
  soluciones: string[] = ["Si no tienes que volar, no vueles. Si tu viaje permite cambiar el avión por el tren hazlo.Si tienes que volar, utiliza una aerolínea responsable que intente proteger el medio ambiente y viaja enaviones grandes(en vez de en chárter privados o aviones pequeños)..",
    "Para ahorrar combustible, la mejor longitud de vuelo ha de ser de aproximadamente 4,828 kilómetros.Los vuelos más largos necesitan más combustible,lo que hace que el avión sea más pesado y menos eficiente, por lo que su huella de carbono por kilómetro aumenta.",
    "Cuanto más pesado es tu equipaje, más peso ha de transportar el avión y por lo tanto menos eficiente será su uso de energía. Mantén tu equipaje ligero, lo cual te resultara además mucho más práctico.",
    "Cuantos más pasajeros lleve un avión, más eficiente se vuelve el uso de energía.Un avión puede llevar más pasajeros si la clase business y la clase de primera permite el mayor espacio disponible al resto de los pasajeros, por lo que habrá menor número de pasajeros. Estas secciones puestas al día, dispondrán también de asientos más robustos,que permitirán guardar más equipaje y una mayor numero de facilidades para los pasajeros.",
    "Elige un aeropouerto ecológico ¿Qué es un aeropuerto ecológico? Factores como sus programas de reciclaje, diseño de edificios sostenibles,reducción de la contaminación acústica y control de emisiones para vehículos aeroportuarios. Los aeropuertos reconocidos por sus esfuerzos ambientales incluyen el Aeropuerto Internacional Logan de Boston, el Aeropuerto de Zurich y el Aeropuerto de East Midlands en Inglaterra."
  ];

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
  randomItem: string;
  token: string;
  userEmail: string;
  fields: string = `name%2Cemail%2Cpicture%2Cfirst_name%2Clast_name`
  consejos: string;
  origenPath: string;
  destinoPath: string
  pasajerosPath: string;

  constructor(private router: Router, private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute, private vueloService: VueloService, private aeropuertoService: AeropuertoService
  ) {
    this.consejos = '/assets/consejos-removebg-preview.png';
    this.origenPath='/assets/avion-removebg-preview.png';
    this.destinoPath='/assets/4524155-removebg-preview.png';
    this.pasajerosPath='/assets/pasajeros-removebg-preview.png';
  }

  ngOnInit(): void {
    //si esta logueado
    if (localStorage.length != 0) {
      let token = JSON.parse(localStorage.getItem('token'));
      this.token = token.token
      let userEmail = JSON.parse(localStorage.getItem('user'));
      this.userEmail = userEmail.username;
    }

  }

  //según el pais de origen y destino se pide al back los aeropuertos 
  getAeropuertosO(event) {
    let changedValue = event.value;
    this.aeropuertoService.buscarPorPais(this.paisOrigen).pipe(
      tap(aeropuertos => this.aeropuertosOrigen = aeropuertos))
      .subscribe(
      );

  }

  getAeropuertosD(event) {
    let changedValue = event.value;
    this.aeropuertoService.buscarPorPais(this.paisDestino).pipe(
      tap(aeropuertos => this.aeropuertosDestino = aeropuertos))
      .subscribe(
      );

  }
  //un viaje en avión se compone de 1 o varios tramos
  public newTramo(): void {
    this.tramo = new Tramo();
  }

  public addTramo(): void {
    this.tramos.push(this.tramo);
    this.tramo = new Tramo();

  }
//método que llama al servicio que se comunica con el back para calcular la huella de un vuelo
  public calcularVuelos(): void {
    this.viajes.legs = this.tramos;
    this.vueloService.calcularHuella(this.viajes)
      .subscribe(huella => {
        console.log(huella.co2e);
        console.log(huella.co2e_unit);
        this.actividad.consumo = huella.co2e;
        var resultado = huella.co2e.toFixed(3);
        swal.fire('Huella generada', `La huella generada ha sido de ${resultado} ${huella.co2e_unit}`, 'success')
      }
      );

  }

//método para borrar los tramos añadidos 
  delete(): void {
    this.tramos.splice(0, this.tramos.length);
  }

//método para añadir la actividad a la bitácora
  public anadir(): void {
    //se verifica que el usuario esté logueado
    if (this.token == null) {
      swal.fire('', 'Para registrar una bitácora de actividades debe estar logueado en CarbonCalculator', 'error');     
    } else {
      //se guarda con la fecha actual 
      this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
      this.actividad.fecha = this.todayWithPipe;
      this.actividad.categoria = "Vuelo";
      console.log(this.actividad);
      this.vueloService.create(this.actividad, this.userEmail).subscribe();
      swal.fire('', 'Actividad añadida correctamente', 'success')
    }


  }
//método para elegir el texto a mostrar en el carousel
  textoAleatorio() {
    this.randomItem = this.soluciones[Math.floor(Math.random() * this.soluciones.length)];
    return this.randomItem;
  }


  ngAfterViewChecked() {
    this.randomItem = this.textoAleatorio();
    this.cdRef.detectChanges();

  }
}
