import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { ViajePublico } from './modelo/viaje.publico';
import { transportePublico } from './tPublico.service';
import { Actividad } from '../bitacora/modelos/actividadTPrivado';
import { observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transporte-publico',
  templateUrl: './transporte-publico.component.html',
  styleUrls: ['./transporte-publico.component.css']
})
export class TransportePublicoComponent implements OnInit {
  titulo: string = "Calcular huella para viaje en transporte publico";
  distancia: number = 0;
  //fotos
  picMetro: string;
  picTaxi: string;
  picBus: string;
  picTren: string;
 
  tipo: string;
  viaje: ViajePublico = new ViajePublico();

  actividad: Actividad = new Actividad();
  today: Date = new Date();
  pipe = new DatePipe('en-EN');
  todayWithPipe = null;


  tipoTransporte=[
    {name:'Metro', code:'Subway'},
    {name:'Taxi', code:'Taxi'},
    {name:'Autobus', code:'Coach'},
    {name:'Tren', code:'NationalTrain'}

  
  
  ];

  form = new FormGroup({
    tipos: new FormControl(this.tipoTransporte[4]),
    distancia: new FormControl(this.distancia)
  });

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private publicoService: transportePublico) { 
    this.picMetro='assets/metro-removebg-preview.png';
    this.picTaxi='assets/taxi-removebg-preview.png';
    this.picBus='assets/bus-removebg-preview.png';
    this.picTren='assets/tren-removebg-preview.png';
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
  }




//mostramos el formulario según el tipo de transporte
showForm(tipos: String) {

  switch (tipos) {

    case 'metro': {
      this.tipo = "Subway";
      break;

    }
    case 'bus': {
      this.tipo= "Coach";
      break;

    }
    case 'taxi': {
      this.tipo = "taxi";
      break;

    }
    case 'tren' : {
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
  console.log(this.viaje.type);
  this.viaje.distance = this.form.value.distancia;
  console.log(this.viaje.distance);
  this.publicoService.calcularHuella(this.viaje)
    .subscribe(huella => {
      console.log(huella.carbonEquivalent);
      this.actividad.consumo = huella.carbonEquivalent;
      swal.fire('Huella generada', `La huella generada ha sido de ${huella.carbonEquivalent} kg`, 'success')
    }
    );
}

public anadir(): void{
  this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
  this.actividad.fecha = this.todayWithPipe;
  this.actividad.categoria = "Transporte Publico";
  console.log(this.actividad);
  this.publicoService.create(this.actividad).subscribe();
  swal.fire('','Actividad añadida correctamente', 'success')

}



}
