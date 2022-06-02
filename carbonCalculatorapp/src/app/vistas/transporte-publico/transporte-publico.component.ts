import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { ViajePublico } from './modelo/viaje.publico';
import { transportePublico } from './tPublico.service';
import { Actividad } from '../bitacora/modelos/actividadTPrivado';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-transporte-publico',
  templateUrl: './transporte-publico.component.html'

})
export class TransportePublicoComponent implements OnInit {
  titulo: string = "Calcular huella para viaje en transporte publico";
  distancia: number = 0;
  //fotos
  picMetro: string;
  picTaxi: string;
  picBus: string;
  picTren: string;
  soluciones = ["No compres ropa que deje huella de plástico. Cientos de miles de micropartículas de plástico se desprenden  con cada lavado de ropa.La ropa de poca calidad que no dura y tienes que cambiarla cada año tiene efectos  devastadores en el medioambiente.Compra ropa duradera producida tu país y en fábricas responsables con el medioambiente.Evita comprar ropa fabricada en China, Bangadesh o cualquier destino que esté lejos de ti.  Así eliminarás el transporte innecesario y apoyarás a los fabricantes locales.Deja secar tu ropa sin  utilizar secadora, ya que esta produce una gran cantidad de CO2.Además, cuando lavas la ropa, intenta  lavarla en agua fría, así evitarás lanzar a la atmósfera una gran cantidad de dióxido de carbono.",
    "Empieza a elegir con más cuidado a tus proveedores. No compres cosas de las empresas que están destruyendo el  medioambiente. Elige proveedores para tus viajes que son responsables con el medioambiente y que intentan  reducir al máximo posible su huella de carbono.",
    "Intenta no comer carne (da igual que sea de cerdo, ternara, pollo u otras) que provenga de grandes fábricas y  cuyos animales no han sido criados de manera natural y local. El proceso para llevar la carne a tu mesa   gasta una gran cantidad de energía y es muy malo no solamente para los mismos animales sino también para todo el planeta. Lo ideal sería reducir las comidas con carne y productos lácteos al mínimo y comer verduras, frutas y judías producidas localmente. No tires comida y si hay algo que tienes que echar, compóstalo.",
    "Compra solamente lo que necesites. Hoy en día la gente compra muchas cosas innecesarias que están destruyendo   nuestro planeta. Si estás comprando por ejemplo un souvenir para ti o para otra persona, pregúntate a ti    mismo y sé sincero. ¿Vas a tenerlo para un año o para toda tu vida? Si tu respuesta es un año, ¡no lo compres! Y compra cosas recicladas siempre que sea posible.",
    "Te pedimos que no utilices bolsas de plástico ni botellas de plástico de un solo uso. Trae tu botella    reutilizable y no compres agua en plástico cuando viajas.No    compres productos que utilicen paquetes de plásticos innecesarios. No apoyes a estas compañías comprando sus   productos.",
    "Las plantas propias de la localidad donde vives no requieren demasiado uso de agua, y sus beneficios son    mayores al absorber el CO2 del aire. Lo mejor sería que plantaras un árbol, pero si no cuentas con el    espacio o las condiciones necesarias, puedes explorar algunas ideas alternativas como los jardines verticales.",
    "Procura aplicar siempre que puedas esta regla: REDUCE, REUTILIZA y RECICLA."
  ];
  tipo: string;
  viaje: ViajePublico = new ViajePublico();
  actividad: Actividad = new Actividad();
  today: Date = new Date();
  pipe = new DatePipe('en-EN');
  todayWithPipe = null;
  randomItem: string;


  tipoTransporte = [
    { name: 'Metro', code: 'Subway' },
    { name: 'Taxi', code: 'Taxi' },
    { name: 'Autobus', code: 'Coach' },
    { name: 'Tren', code: 'NationalTrain' }
  ];

  form = new FormGroup({
    tipos: new FormControl(this.tipoTransporte[4]),
    distancia: new FormControl(this.distancia)
  });

  token: string;
  userEmail: string;
  fields: string = `name%2Cemail%2Cpicture%2Cfirst_name%2Clast_name`
  consejos: string;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private publicoService: transportePublico) {
    this.picMetro = 'assets/metro-removebg-preview.png';
    this.picTaxi = 'assets/taxi-removebg-preview.png';
    this.picBus = 'assets/bus-removebg-preview.png';
    this.picTren = 'assets/tren-removebg-preview.png';
    this.consejos = '/assets/consejos-removebg-preview.png';
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    if (localStorage.length != 0) {
      let token = JSON.parse(localStorage.getItem('token'));
      this.token = token.token
      let userEmail = JSON.parse(localStorage.getItem('user'));
      this.userEmail = userEmail.username;
    }
  }

  //mostramos el formulario según el tipo de transporte
  showForm(tipos: String) {
    switch (tipos) {

      case 'metro': {
        this.tipo = "Subway";
        break;

      }
      case 'bus': {
        this.tipo = "Coach";
        break;

      }
      case 'taxi': {
        this.tipo = "taxi";
        break;

      }
      case 'tren': {
        this.tipo = "NationalTrain";
        break;

      }

      default: {
        break;
      }
    }

  }

  public calcularTPublico(): void {

    this.viaje.type = this.tipo;
    this.viaje.distance = this.form.value.distancia;
    this.publicoService.calcularHuella(this.viaje)
      .subscribe(huella => {
        this.actividad.consumo = huella.carbonEquivalent;
        swal.fire('Huella generada', `La huella generada ha sido de ${huella.carbonEquivalent} kg`, 'success')
      }
      );
  }

  public anadir(): void {
    if (this.token == null) {
      swal.fire('', 'Para registrar una bitácora de actividades debe estar logueado en Zerokhoi', 'error');
    } else {
      this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
      this.actividad.fecha = this.todayWithPipe;
      this.actividad.categoria = "Transporte Publico";
      this.publicoService.create(this.actividad, this.userEmail).subscribe();
      swal.fire('', 'Actividad añadida correctamente', 'success')
    }


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
