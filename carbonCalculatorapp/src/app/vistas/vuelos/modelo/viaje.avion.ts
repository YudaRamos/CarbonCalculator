import{Tramo} from './tramo';
export class ViajeAvion{
 legs:Tramo[]=[];

  constructor() { }

  get _legs(): Tramo[] {
       return this.legs;
   }

   set _legs(newTramos:Tramo[]) {
        this.legs = newTramos;

   }

}
