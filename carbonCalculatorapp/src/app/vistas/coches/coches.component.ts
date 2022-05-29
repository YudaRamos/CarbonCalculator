import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Combustible } from './modelo/combustible';
import { SizeCar } from './modelo/size';
import { ViajeCoche } from './modelo/viaje.coche';
import { Router, ActivatedRoute } from '@angular/router';
import { CocheService } from './coche.service';
import swal from 'sweetalert2'
import { ViajeMoto } from './modelo/viaje.moto';
import { DatePipe } from '@angular/common';
import { Actividad } from '../bitacora/modelos/actividadTPrivado';

@Component({
  selector: 'app-coches',
  templateUrl: './coches.component.html',
  styleUrls: ['./coches.component.css']
})
export class CochesComponent implements OnInit {
  titulo: string = "Calcular huella para viaje en transporte privado";
  ImagePath: string;
  vans: string;
  motobike: string;
  turismo: boolean = false;
  van: boolean = false;
  moto: boolean = false;
  distancia: number = 0;
  viaje: ViajeCoche = new ViajeCoche();
  viajeMoto: ViajeMoto = new ViajeMoto();
  tipo: string;
  combustible: Combustible = new Combustible();
  size: SizeCar = new SizeCar();
  today: Date = new Date();
  pipe = new DatePipe('en-EN');
  todayWithPipe = null;
  actividad: Actividad = new Actividad();



  combustibles =
    [
      { name: 'Diesel', code: 'Diesel' },
      { name: 'Gasolina', code: 'Petrol' },
      { name: 'Híbrido', code: 'Hybrid' },
      { name: 'GNC', code: 'CNG' },
      { name: 'LPG', code: 'LPG' }
    ];


  sizesCar =
    [
      { name: 'Segmento A', code: 'Small' },
      { name: 'Segmento B,C,D,E', code: 'Medium' },
      { name: 'Segmento F, SUV,Todoterreno', code: 'Large' }
    ];


  sizesHib =
    [
      { name: 'Segmento F, SUV,Todoterreno', code: 'Large' },
      { name: 'Segmento B,C,D,E', code: 'Medium' }

    ];

  combustiblesV =
    [
      { name: 'Diesel', code: 'Diesel' },
      { name: 'Gasolina', code: 'Petrol' }

    ];


  sizesVan =
    [
      { name: 'Segmento F, SUV,Todoterreno', code: 'Large' },
      { name: 'Segmento A', code: 'Small' }

    ];

  sizesMoto =
    [
      { name: ' 50 centímetros cúbicos', code: 'Small' },
      { name: ' 125 centímetros cúbicos', code: 'Small' },
      { name: ' 250 centímetros cúbicos', code: 'Medium' },
      { name: ' 300 centímetros cúbicos', code: 'Medium' },
      { name: ' 500 centímetros cúbicos', code: 'Medium' },
      { name: '1000 centímetros cúbicos o más', code: 'Large' }

    ];




  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private cocheService: CocheService) {
    this.ImagePath = '/assets/coche-removebg-preview.png';
    this.vans = '/assets/vans-removebg-preview.png';
    this.motobike = '/assets/motor-removebg-preview.png';

  }


  ngOnInit(): void {
  }



  //mostramos el formulario según el tipo de vehiculo
  showForm(tipo: String) {
    switch (tipo) {

      case 'turismo': {
        this.turismo = true;
        this.van = false;
        this.moto = false;
        this.tipo = "Car";
        break;
      }
      case 'van': {
        this.turismo = false;
        this.van = true;
        this.moto = false;
        this.tipo = "Van";
        break;
      }
      case 'moto': {
        this.turismo = false;
        this.van = false;
        this.moto = true;
        this.tipo = "MotorBike";
        break;
      }

      default: {
        break;
      }
    }

  }
  public calcularCoches(): void {
    //si es un turismo enviamos combutible+tamaño
    if (this.turismo) {
      this.viaje.vehicle = this.viaje.size + this.viaje.combustible + this.tipo;
      console.log(this.viaje.vehicle);
    }
    //si es una van y de GNC o LPG no enviamos el tamaño del vehículo
    if (this.van) {
      if (this.viaje.combustible == "CNG" || this.viaje.combustible == "LPG") {
        this.viaje.vehicle = this.viaje.combustible + this.tipo;

      } else {
        this.viaje.vehicle = this.viaje.size + this.viaje.combustible + this.tipo;
      }
    }

    if (this.moto) {
      this.calcularMotos();
      return;
    }

    console.log(this.viaje.vehicle);
    console.log(this.viaje.distance);
    console.log(this.distancia);


    this.cocheService.calcularHuella(this.viaje)
      .subscribe(huella => {
        //    this.router.navigate(['/vuelos'])
        console.log(huella.carbonEquivalent);
        this.actividad.consumo = huella.carbonEquivalent;
        swal.fire('Huella generada', `La huella generada ha sido de ${huella.carbonEquivalent} Kg`, 'success')
      }
      );
  }


  public calcularMotos(): void {

    this.viajeMoto.type = this.viajeMoto.size + this.tipo;
    console.log(this.viajeMoto.type);

    console.log(this.viajeMoto.distance);
    this.cocheService.calcularHuellaMotos(this.viajeMoto)
      .subscribe(huella => {
        //this.router.navigate(['/vuelos'])
        this.actividad.consumo = huella.carbonEquivalent;
        console.log(huella.carbonEquivalent);
        swal.fire('Huella generada', `La huella generada ha sido de ${huella.carbonEquivalent} Kg`, 'success')
      }
      );
  }


  public anadir(): void{
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.actividad.fecha = this.todayWithPipe;
    this.actividad.categoria = "Transporte Privado";
    console.log(this.actividad);
    this.cocheService.create(this.actividad).subscribe();
    swal.fire('','Actividad añadida correctamente', 'success')

  }



}
