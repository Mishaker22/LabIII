namespace Parcial2{
    
    export class Camioneta extends Vehiculo{
        private cuatroXCuatro: boolean;

        constructor(id:number,marca:string,modelo:string,precio:number, cuatroXcuatro:boolean) {
            super(id,marca,modelo,precio);
            this.cuatroXCuatro = cuatroXcuatro;
        }

        public get4x4() {
            return this.cuatroXCuatro;   
        }
    }
}