import { Component, OnInit } from '@angular/core';
import { electricidadConsumo } from './modelo/electricidad.consumo';
import { ElectricidadService } from './electricidad.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Electrodomestico } from './modelo/electrodomestico';
import { Actividad } from '../bitacora/modelos/actividadElectricidad';
import { DatePipe } from '@angular/common';
import { BitacoraService } from '../bitacora/bitacora.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-electricidad',
  templateUrl: './electricidad.component.html'
})
export class ElectricidadComponent implements OnInit {

  //variables globales
  titulo: string = "Calcular huella para el consumo de la Electricidad";
  consumoTotal: number = 0;
  pais: string;
  medidaConsumo: string;
  electricidad: electricidadConsumo = new electricidadConsumo();
  electrodomestico: Electrodomestico = new Electrodomestico();
  electrodomesticosAnanidos: Electrodomestico[] = [];
  actividad: Actividad = new Actividad();
  today: Date = new Date();
  pipe = new DatePipe('en-EN');
  consejos: string;
  todayWithPipe = null;
  soluciones = ["Desconecta todos los cargadores de electricidad si no los estás utilizando o no necesitas tener tus aparatos conectados.Aunque los cargadores no están en uso directo siguen consumiendo energía y contribuyen al calentamiento global, por eso se llaman “vampiros de energía”",
    "Utiliza solamente el agua que sea imprescindible. ¡No gastes agua de más! Haz lo mismo con la luz o, mejor dicho, con toda la energía. No hay razón para gastar estos recursos más de lo necesario.",
    "Parece una tontería, pero cuantas más bolsas de plástico y paquetes haya en tu frigorífico más consumo eléctrico generas, ya que el aparato necesita más potencia para enfriar los alimentos. ",
    "Algunos de los electrodomésticos de tu casa consumen más de lo que crees y no en todos los casos es necesario que estén siempre enchufados. No te pedimos que desenchufes el frigorífico (a no ser que te cojas unas largas vacaciones), pero ¿qué sentido tiene tener en stand-by la tele y el DVD y la minicadena y el portátil? ¿Por qué tener enchufados tres o cuatro cargadores que no están conectados a ningún móvil ni tablet? Y mejor no hablar de dejarse encendidas las luces de habitaciones en las que no hay nadie. Este frente de batalla es fundamental y además de reducir tu huella de carbono te ayudará a ahorrar en tu factura eléctrica.",
    "La plancha es un aparato de uso cotidiano que consume una gran cantidad de energía. Utilizarla de manera ordenada te permite ahorrar energía y reducir gastos: intenta planchar la mayor cantidad posible de ropa  cada vez que la enciendas, ya que conectar y desconectar muchas veces la plancha consume más energía que  mantenerla encendida un tiempo. También es recomendable desconectar la plancha un poco antes de terminar para aprovechar la temperatura acumulada.",
    "Utiliza bombillas de bajo consumo (lámparas fluorescentes compactas) en vez de focos incandescentes: usan entre un 50% y un 80% menos de energía, producen la misma cantidad de luz y duran diez veces más. También puedes optar por las lámparas LEDS, que también consumen mucho menos y tienen una duración aproximada de 70.000 horas, por lo que pueden llegar a durar hasta 50 años. Además, si optas por pintar el interior de tu casa con colores claros, también necesitarás menos energía para iluminarla: la luz de tus bombillas se reflejará mucho mejor y necesitarás menos iluminación artificial",
    "Si instalas toldos de lona, aleros inclinados, persianas de aluminio o vidrios polarizados en las ventanas evitarás que el sol alcance directamente el interior de tu vivienda y la refrescarás con un gasto menor que  si utilizaras aire acondicionado. Además, utilizando un aislamiento adecuado en techos y paredes se puede  mantener una temperatura agradable y reducir el uso tanto de calefacción como de aire acondicionado. Si  utilizas estos sistemas, no te olvides de controlar el termostato: se recomienda mantenerlo a no más de 18°C  en invierno y a no más de 25°C en verano."
  ];
  randomItem: string;
  huellaProducida: number;
  token: string;
  userEmail: string;
  fields: string = `name%2Cemail%2Cpicture%2Cfirst_name%2Clast_name`

  paises =
    [
      { name: 'Estados Unidos', code: 'US' },
      { name: 'Canada', code: 'CA' },
      { name: 'Austria', code: 'AT' },
      { name: 'Bélgica', code: 'BE' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Croacia', code: 'HR' },
      { name: 'Chipre', code: 'CY' },
      { name: 'Republica Checa', code: 'CZ' },
      { name: 'Dinamarca', code: 'DK' },
      { name: 'EU-27', code: 'EU-27' },
      { name: 'EU-27+1', code: 'EU-27+1' },
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

  medidas =
    [
      { name: 'Megavatio', code: 'mwh' },
      { name: 'Kilovatio', code: 'kwh' }
    ];

  electrodomesticos =
    [
      'Frigorífico',
      'Microondas',
      'Lavadora',
      'Secadora',
      'Lavavajillas',
      'Horno',
      'Vitroceramica'

    ];

  constructor(private router: Router, private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute, private electricidadService: ElectricidadService, private bitacoraService: BitacoraService) {
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

  public addConsumo(): void {
    this.electrodomesticosAnanidos.push(this.electrodomestico);
    this.electrodomestico = new Electrodomestico();

  }

  delete(): void {
    this.electrodomesticosAnanidos.splice(0, this.electrodomesticosAnanidos.length);
  }

  public calcularElectricidad(): void {
    if (this.electrodomesticosAnanidos.length == 0) {

      this.electricidad.electricity_value = this.electrodomestico.electricity_value;
      this.electricidad.electricity_unit = this.electrodomestico.electricity_unit;
      this.electricidad.country = this.electrodomestico.country;
      this.electricidadService.calcularHuella(this.electricidad)
        .subscribe(huella => {
          this.router.navigate(['/electricidad'])
          console.log(huella);
          this.actividad.consumo = huella;
          console.log(this.actividad.consumo);
          Swal.fire('Huella generada', `la huella generada ha sido de ${huella} Kg`, 'success')
        });

    } else {
      this.electrodomesticosAnanidos.forEach(elec => {
        this.consumoTotal = Number(elec.electricity_value) + Number(this.consumoTotal);
        this.pais = elec.country;
        this.medidaConsumo = elec.electricity_unit;
      });

      this.electricidad.electricity_value = this.consumoTotal;
      this.electricidad.electricity_unit = this.medidaConsumo;
      this.electricidad.country = this.pais;
      console.log(this.electricidad);

      this.electricidadService.calcularHuella(this.electricidad)
        .subscribe(huella => {
          this.router.navigate(['/electricidad'])
          console.log(huella);
          this.actividad.consumo = huella;
          Swal.fire('Huella generada', `la huella generada ha sido de ${huella} Kg`, 'success')
        });
      this.consumoTotal = 0;

    }


  }

  public anadir(): void {
    if (this.token == null) {
      Swal.fire('', 'Para registrar una bitácora de actividades debe estar logueado en CarbonCalculator', 'error');
    } else {
      this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
      console.log(this.token, this.fields);
      this.bitacoraService.validate(this.token, this.fields).subscribe(
        FacebookTokenResponse => {
          console.log(FacebookTokenResponse.email, this.userEmail);
          if (FacebookTokenResponse.email != this.userEmail) {
            Swal.fire('Token inválido')
          } else {
            if (this.electrodomesticosAnanidos.length == 0) {
              this.actividad.fecha = this.todayWithPipe;
              this.actividad.categoria = "Electricidad";
              this.actividad.fecha = this.todayWithPipe;
              console.log(this.actividad);
              this.electricidadService.create(this.actividad, this.userEmail).subscribe();
              Swal.fire('', 'Actividad añadida correctamente', 'success')

            } else {

              this.electrodomesticosAnanidos.forEach(elec => {
                this.consumoTotal = Number(elec.electricity_value) + Number(this.consumoTotal);
              });
              this.actividad.fecha = this.todayWithPipe;
              this.actividad.categoria = "Electricidad";
              this.actividad.fecha = this.todayWithPipe;
              console.log(this.actividad);
              this.electricidadService.create(this.actividad, this.userEmail).subscribe();
              Swal.fire('', 'Actividad añadida correctamente', 'success')

            }
          }
        }

      );

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
