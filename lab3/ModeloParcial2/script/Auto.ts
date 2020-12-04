namespace Parcial2{

    export class Auto extends Vehiculo
    {
        public cantPuertas: number;

        constructor(id:number,marca:string,modelo:string,precio:number, cantidadPuertas:number) {
            super(id,marca,modelo,precio);
            this.cantPuertas = cantidadPuertas;
        }

        public getPuertas() {
            return this.cantPuertas;   
        }

        
    }
}