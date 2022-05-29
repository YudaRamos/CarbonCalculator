import { Component, OnInit } from '@angular/core';
import { electricidadConsumo } from './modelo/electricidad.consumo';
import { ElectricidadService } from './electricidad.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DropdownModule } from 'primeng/dropdown';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Electrodomestico } from './modelo/electrodomestico';
import { Actividad } from '../bitacora/modelos/actividadElectricidad';
import { DatePipe } from '@angular/common';
import { huellaGenerada } from './modelo/huella.generada';
import { BitacoraService } from '../bitacora/bitacora.service';

@Component({
  selector: 'app-electricidad',
  templateUrl: './electricidad.component.html',
  styleUrls: ['./electricidad.component.css']
})
export class ElectricidadComponent implements OnInit {
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
  todayWithPipe = null;
  
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

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private electricidadService: ElectricidadService, private bitacoraService: BitacoraService) { }

  ngOnInit(): void {
    if (localStorage.length!=0){
      let token = JSON.parse(localStorage.getItem('token'));
    this.token = token.token
    let userEmail = JSON.parse(localStorage.getItem('user'));
    this.userEmail = userEmail.username;
    console.log(this.token);
    console.log(this.userEmail);
    }
    
    
  }




  public addConsumo(): void {

    this.electrodomesticosAnanidos.push(this.electrodomestico);
    this.electrodomestico = new Electrodomestico();

  }

  delete(): void {
    this.electrodomesticosAnanidos.splice(0,this.electrodomesticosAnanidos.length);
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
      Swal.fire('','Para registrar una bitácora de actividades debe estar logueado en Zerokhoi','error');
      // this.router.navigate(['/login']);
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
              this.electricidadService.create(this.actividad).subscribe();
              Swal.fire('','Actividad añadida correctamente', 'success')

            } else {

              this.electrodomesticosAnanidos.forEach(elec => {
                this.consumoTotal = Number(elec.electricity_value) + Number(this.consumoTotal);
              });
              this.actividad.fecha = this.todayWithPipe;
              this.actividad.categoria = "Electricidad";
              this.actividad.fecha = this.todayWithPipe;
              console.log(this.actividad);
              this.electricidadService.create(this.actividad).subscribe();
              Swal.fire('','Actividad añadida correctamente', 'success')

            }
          }
        }

      );



    }


  }


}
