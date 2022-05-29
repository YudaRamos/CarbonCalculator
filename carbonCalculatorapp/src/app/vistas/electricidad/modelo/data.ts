import { Atributos } from "./atribute";
export class Datos{

    atributo: Atributos;

    get _atributo(): Atributos{
        return this.atributo;
    }
    set _atributo(atributo:Atributos) {
        this.atributo = atributo;
    }

}