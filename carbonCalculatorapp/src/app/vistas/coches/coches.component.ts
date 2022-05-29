import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Combustible } from './modelo/combustible';
import { SizeCar } from './modelo/size';
import { ViajeCoche } from './modelo/viaje.coche';
import { Router, ActivatedRoute } from '@angular/router';
import { CocheService } from './coche.service';
import swal from 'sweetalert2'
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
  tipo: string;

  combustibles =
    [
      { name: 'Diesel', code: 'Diesel' },
      { name: 'Petróleo', code: 'Petrol' },
      { name: 'Híbrido', code: 'Hybrid' },
      { name: 'GNC', code: 'CNG' },
      { name: 'LPG', code: 'LPG' }
    ];
  combustiblesV =
    [
      { name: 'Diesel', code: 'Diesel' },
      { name: 'Petróleo', code: 'Petrol' },
      { name: 'GNC', code: 'CNG' },
      { name: 'LPG', code: 'LPG' }
    ];
  sizes =
    [
      { name: 'Pequeño', code: 'Small' },
        { name: 'Mediano', code: 'Medium' },
      { name: 'Grande', code: 'Large' }


    ];
  sizesAll =
    [
      { name: 'Pequeño', code: 'Small' },
        { name: 'Mediano', code: 'Medium' },
      { name: 'Grande', code: 'Large' }

    ];
  sizesVan =
    [
      { name: 'Grande', code: 'Large' },
      { name: 'Pequeño', code: 'Small' }

    ];

  sizesLarge =
    [
      { name: 'Grande', code: 'Large' },
      { name: 'Mediano', code: 'Medium' }

    ];

  form = new FormGroup({
    combustible: new FormControl(this.combustibles[5]),
    size: new FormControl(this.sizesAll[3]),
    distancia: new FormControl(this.distancia)
  });



  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private cocheService: CocheService) {
    this.ImagePath = '/assets/coche-removebg-preview.png';
    this.vans = '/assets/vans-removebg-preview.png';
    this.motobike = '/assets/motor-removebg-preview.png';

  }


  get f() {
    return this.form.controls;
  }
  ngOnInit(): void {
  }
  //metodo para turismo
  actualizarTipoVeh() {

    console.log(this.form.value);
    switch (this.form.value.combustible.code) {
      case 'Diesel':
      case 'Petrol': {
        this.sizesAll = this.sizes;
        break;
      }
      case 'Hybrid':
      case 'LPG':
      case 'CNG': {
        this.sizesAll = this.sizesLarge;
        break;
      }
      case 'LPG':
      case 'CNG': {
        this.sizesAll = this.sizesLarge;
        break;
      }

      default: {
        this.sizesAll = this.sizesAll;
        break;
      }
    }

  }
  //metodo para turismo
  actualizarTipoVans() {

    console.log(this.form.value);
    switch (this.form.value.combustible.code) {
      case 'Diesel':
        {
          this.sizesAll = this.sizes;
          break;
        }
      case 'Petrol': {
        this.sizesAll = this.sizesVan;
        break;
      }
      default: {
        console.log('entre en default');
        this.sizesAll = [];
        break;
      }
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

    this.viaje.vehicle = this.form.value.size.code + this.form.value.combustible.code+  this.tipo;
    console.log(this.viaje.vehicle);
    this.viaje.distance = this.form.value.distancia;
    console.log(this.viaje.distance);
    this.cocheService.calcularHuella(this.viaje)
      .subscribe(huella => {
        //    this.router.navigate(['/vuelos'])
        console.log(huella.carbonEquivalent);
        swal.fire('Huella generada', `La huella generada ha sido de ${huella.carbonEquivalent}`, 'success')
      }
      );
  }




}
