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
import { ChangeDetectorRef } from '@angular/core';

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
  soluciones = [
    "Hoy en día hay toallas que no pesan nada y se secan enseguida de forma natural, por lo que te pedimos que lleves siempre tu propia toalla en tus viajes. Es totalmente ridículo que los hoteles y otros alojamientos  laven las toallas cada día. Si no lo haces en casa, no es necesario que te lo hagan cuando viajas. De esta  forma ahorrarás mucha agua y energía, además de evitar la destrucción del medioambiente con químicos  totalmente incesarios.",
    "Busca un estilo de viaje que tenga algo más que ofrecer no solamente para ti, sino también para la comunidad  local que visites y para el medioambiente.  Utiliza proveedores que ayuden a proteger el medioambiente. Busca excursiones con valor añadido.  Por ejemplo, puedes ir a plantar árboles durante tu viaje, ayudar a quitar basura de la naturaleza, etc.",
    "Caminar, usar bicicletas mecánicas o bicicletas eléctricas: medios de transporte perfectos para desplazamientos cortos y que permiten realizar una actividad física regular. Además, el uso de una bicicleta en lugar de un coche reduce considerablemente la huella de carbono.",
    "Los coches eléctricos o híbridos: los vehículos eléctricos generarán menor contaminación acústica, de gases y de partículas en las ciudades.  En algunas ciudades existe el carsharing eléctricos ;un servicio de alquiler de coches en el que el usuario sólo paga por las horas que utiliza el vehículo",
    "Compartir coche: Compartir coche es una forma muy interesante para ahorrar en nuestros trayectos y ahorrar en emisiones de CO2.",
    "Alquilar coche: según los últimos estudios realizados, el desembolso anual de mantenimiento de un coche en propiedad supone una carga financiera muy alta, carga que se ve muy reducida si sólo alquilamos un coche cuando realmente lo necesitamos."
  ];


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

  huellaProducida: number;
  token: string;
  userEmail: string;
  fields: string = `name%2Cemail%2Cpicture%2Cfirst_name%2Clast_name`
  randomItem: string;
  consejos: string;


  constructor(private router: Router, private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute, private cocheService: CocheService) {
    this.ImagePath = '/assets/coche-removebg-preview.png';
    this.vans = '/assets/vans-removebg-preview.png';
    this.motobike = '/assets/motor-removebg-preview.png';
    this.consejos = '/assets/consejos-removebg-preview.png';
  }


  ngOnInit(): void {
    if (localStorage.length != 0) {
      let token = JSON.parse(localStorage.getItem('token'));
      this.token = token.token
      let userEmail = JSON.parse(localStorage.getItem('user'));
      this.userEmail = userEmail.username;

    }
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
        if (this.viaje.combustible == "Diesel"){
          this.viaje.combustible= "Dielsel"
        }
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


  public anadir(): void {
    if (this.token == null) {
      swal.fire('', 'Para registrar una bitácora de actividades debe estar logueado en Zerokhoi', 'error');
      // this.router.navigate(['/login']);
    } else {
      this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
      this.actividad.fecha = this.todayWithPipe;
      this.actividad.categoria = "Transporte Privado";
      console.log(this.actividad);
      this.cocheService.create(this.actividad,this.userEmail).subscribe();
      swal.fire('', 'Actividad añadida correctamente', 'success')
    }



  }

  textoAleatorio() {
    this.randomItem = this.soluciones[Math.floor(Math.random() * this.soluciones.length)];
    return this.randomItem;
  }


  ngAfterContentChecked() {
    this.randomItem = this.textoAleatorio();
    this.cdRef.detectChanges();

  }

}
