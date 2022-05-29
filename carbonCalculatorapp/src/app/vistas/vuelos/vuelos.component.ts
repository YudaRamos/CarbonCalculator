import { Component, OnInit } from '@angular/core';
import{Tramo} from './modelo/tramo';
import{ViajeAvion} from './modelo/viaje.avion';
import{Huella} from './modelo/huella.calculada';
import { Router, ActivatedRoute } from '@angular/router';
import {VueloService} from './vuelo.service';

import swal from 'sweetalert2'
@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {
 titulo:string = "Calcular huella para viaje en avión"
 tramo:Tramo= new Tramo();
 tramos:Tramo[]=[];
 viajes:ViajeAvion =new ViajeAvion();
// huella:Huella=new Huella();
 errores:string[]=[];

  constructor(  private router:Router,
    private activatedRoute:ActivatedRoute, private vueloService:VueloService) { }//

  ngOnInit(): void {
  }


  public calcularVuelos():void {
    this.viajes.legs=this.tramos;
   this.vueloService.calcularHuella(this.viajes)
    .subscribe(huella => {
  //    this.router.navigate(['/vuelos'])
  console.log(huella.co2e);
  console.log(huella.co2e_unit);
    swal.fire('Huella generada',`La huella generada ha sido de ${huella.co2e} ${huella.co2e_unit}`,'success')
    }
      );
  }

  public newTramo():void {
   this.tramo= new Tramo();
  }

  public addTramo():void {
    this.tramos.push(this.tramo);
       this.tramo= new Tramo();
    swal.fire('Tramo agregado','','success')

      ;
  }
}
