export class electricidadConsumo {

    tipo: string = "electricity";
    country: string;
    electricity_unit: string;
    electricity_value: number;

    constructor(){}

    get _tipo(): string{
        return this.tipo;
    }

    get _country(): string {
        return this.country;
    }
 
    set _country(country:string) {
        this.country = country;
    }
    get _electricity_unit(): string {
        return this.electricity_unit;
    }
 
    set _electricity_unit(electricity_unit:string) {
        this.electricity_unit = electricity_unit;
    }

    get _electricity_value(){
        return this.electricity_value;
    }

    set _electricity_value(electricity_value:number){
        this.electricity_value = electricity_value;
    }


}