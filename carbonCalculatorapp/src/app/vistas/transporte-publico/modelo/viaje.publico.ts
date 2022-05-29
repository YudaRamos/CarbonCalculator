
export class ViajePublico{
distance:string;
type : string;

  constructor() { }

  get _distance(): string {
       return this.distance;
   }

   set _distance(distance:string) {
        this.distance = distance;

   }
   get _type(): string {
        return this.type;
    }

    set _type(type:string) {
         this.type = type;

    }

}
