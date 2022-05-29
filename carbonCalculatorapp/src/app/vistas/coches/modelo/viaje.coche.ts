
export class ViajeCoche{
distance:string;
vehicle : string;
combustible: string;
size:string;

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

    get _combustible(): string {
     return this.combustible;
 }

 set _combustible(combustible:string) {
      this.combustible = combustible;

 }
 get _size(): string {
     return this.size;
 }

 set _size(size:string) {
      this.size = size;

 }

}
