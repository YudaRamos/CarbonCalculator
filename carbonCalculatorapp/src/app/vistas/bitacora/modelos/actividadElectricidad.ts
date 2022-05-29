import { huellaGenerada } from "../../electricidad/modelo/huella.generada";
export class Actividad {
    fecha: Date;
    categoria: string;
    consumo: huellaGenerada;

    
    get _actividad(): string{
        return this.categoria;
    }

    set _actividad(actividad:string) {
        this.categoria = actividad;
    }

    get _consumo(): number{
        return this.consumo.response;
    }

    set _consumo(consumo:number) {
        this.consumo.response = consumo;
    }

    get _fecha(): Date{
        return this.fecha;
    }

    set _fecha(fecha:Date) {
        this.fecha = fecha;

    }
}