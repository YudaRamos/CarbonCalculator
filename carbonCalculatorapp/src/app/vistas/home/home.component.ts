import { AfterContentChecked, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterContentChecked{
  title = 'Bienvenido a CarbonCalculator';
  curiosidades = ["Las emisiones anuales de carbono por usuario rondan los 299 gramos de CO2.",
    "Enviar 65 mensajes de correo electrónico equivale aproximadamente a conducir un kilómetro en coche. Cada día se envían unos 280.000 millones.",
    "Cada búsqueda en Google supone al menos una emisión de 0,2 gramos de dióxido de carbono.",
    "Eliminar 30 correos electrónicos se pueden ahorrar hasta 222 W, casi el equivalente a una bombilla de bajo consumo que se deja encendida durante un día.",
    "El CO2, es un gas natural, esencial para el ciclo biológico de las plantas y cosechas.",
    "El consumo anual de YouTube genera 10 millones de toneladas de CO2.",
    "El uso de Spotify produce entre 200 y 350 mil toneladas de GEI al año, según la revista Rolling Stone.",
    "La minería de bitcóin consume  mas electricidad que 159 países 121.36 teravatios / hora al año, es decir, más de lo que consumen Google, Apple, Facebook y Microsoft juntos.",
    "La concentración de CO2 en 2018 fue de 407.8 ppm, lo que equivale al 147% más del nivel obtenido en la época preindustrial (1750).",
    "Según la Estrategia Española de Movilidad Sostenible, en 2006 la carretera causó el 89,2% de las emisiones del transporte, la aviación nacional el 6,6%, el cabotaje marítimo el 3,9% y el ferrocarril el restante 0,3%.  Por tipo de vehículo, el 53,2% de las emisiones del transporte por carretera correspondieron a los turismos y motocicletas, mientras que el 33,5% provino de los vehículos pesados (autobuses y camiones) y el restante 13,3% de los vehículos de transporte ligeros.",
    "En el 2015, los principales emisores de dióxido de carbono (CO2) fueron China, Estados Unidos, la Unión Europea, India, Rusia y Japón."];

   sabias:string
   randomItem: string; 
  constructor(private cdRef: ChangeDetectorRef) {
    this.sabias= '/assets/sabiasss-removebg-preview.png';
   }



  ngOnInit(): void {

  }

  ngAfterContentChecked() {
    this.randomItem = this.textoAleatorio();
    this.cdRef.detectChanges();

  }

  textoAleatorio() {
    this.randomItem = this.curiosidades[Math.floor(Math.random() * this.curiosidades.length)];
    return this.randomItem;
  }

 
}