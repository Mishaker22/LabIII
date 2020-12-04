namespace Parcial2
{
    export class Vehiculo
    {
        public id: number;
        public marca:string;
        public modelo: string;
        public precio: number;

        constructor(id:number,brand:string,model:string,price:number) {
            this.id = id;
            this.marca = brand;
            this.modelo = model;
            this.precio = price;
        }
        public getId() {
            return this.id;   
        }

        public getMarca() {
            return this.marca;   
        }

        public getModelo() {
            return this.modelo;   
        }
        public getPrecio() {
            return this.precio;   
        }
    }
}