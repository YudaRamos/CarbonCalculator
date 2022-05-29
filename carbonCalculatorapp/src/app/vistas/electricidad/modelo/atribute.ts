export class Atributos{

    carbon_g: number;
    carbon_lb: number;
    carbon_kg: number;
    carbon_mt: number;

    get _carbon_g(): number{
        return this.carbon_g;
    }
    set _carbon_g(carbon_g:number) {
        this.carbon_g = carbon_g;
    }
    get _carbon_lb(): number {
        return this.carbon_lb;
    }
 
    set _carbon_lb(carbon_lb:number) {
        this.carbon_lb = carbon_lb;
    }
    get _carbon_kg(): number {
        return this.carbon_kg;
    }
 
    set _carbon_kg(carbon_kg:number) {
        this.carbon_kg = carbon_kg;
    }

    get _carbon_mt(): number{
        return this.carbon_mt;
    }

    set _carbon_mt(carbon_mt:number){
        this.carbon_mt = carbon_mt;
    }



}