
export class ViajeCoche{
distance:string;
vehicle : string;

  constructor() { }

  get _distance(): string {
       return this.distance;
   }

   set _distance(distance:string) {
        this.distance = distance;

   }
   get _vehicle(): string {
        return this.vehicle;
    }

    set _vehicle(vehicle:string) {
         this.vehicle = vehicle;

    }

}
