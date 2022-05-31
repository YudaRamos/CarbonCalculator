import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterContentChecked{
  title = 'Bienvenido a Zerokhoi';
  curiosidades = ["Las emisiones anuales de carbono por usuario rondan los 299 gramos de CO2.",
    "Enviar 65 mensajes de correo electrónico equivale aproximadamente a conducir un kilómetro en coche. Cada día se envían unos 280.000 millones.",
    "Cada búsqueda en Google supone al menos una emisión de 0,2 gramos de dióxido de carbono.",
    "Eliminar 30 correos electrónicos se pueden ahorrar hasta 222 W, casi el equivalente a una bombilla de bajo consumo que se deja encendida durante un día.",
    "El CO2, es un gas natural, esencial para el ciclo biológico de las plantas y cosechas.",
    "El consumo anual de YouTube genera 10 millones de toneladas de CO2.",
    "El uso de Spotify produce entre 200 y 350 mil toneladas de GEI al año, según la revista Rolling Stone.",
    "La minería de bitcóin consume  mas electricidad que 159 países 121.36 teravatios / hora al año, es decir, más de lo que consumen Google, Apple, Facebook y Microsoft juntos.",
    "La concentración de CO2 en 2018 fue de 407.8 ppm, lo que equivale al 147% más del nivel obtenido en la época preindustrial (1750).",
    "En el 2015, los principales emisores de dióxido de carbono (CO2) fueron China, Estados Unidos, la Unión Europea, India, Rusia y Japón."];

   

  constructor(private cd:ChangeDetectorRef) { }



  ngOnInit(): void {

  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  textoAleatorio() {
    var randomItem = this.curiosidades[Math.floor(Math.random() * this.curiosidades.length)];
    return randomItem;
  }
}