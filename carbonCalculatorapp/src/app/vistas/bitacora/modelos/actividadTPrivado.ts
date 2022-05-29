import { Response } from "../../coches/modelo/response";
export class Actividad {
    fecha: Date;
    categoria: string;
    consumo: number;

    
    get _actividad(): string{
        return this.categoria;
    }

    set _actividad(actividad:string) {
        this.categoria = actividad;
    }

    get _consumo(): number{
        return this.consumo;
    }

    set _consumo(consumo:number) {
        this.consumo = consumo;
    }

    get _fecha(): Date{
        return this.fecha;
    }

    set _fecha(fecha:Date) {
        this.fecha = fecha;

    }
}