var Parcial2;
(function (Parcial2) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, brand, model, price) {
            this.id = id;
            this.marca = brand;
            this.modelo = model;
            this.precio = price;
        }
        Vehiculo.prototype.getId = function () {
            return this.id;
        };
        Vehiculo.prototype.getMarca = function () {
            return this.marca;
        };
        Vehiculo.prototype.getModelo = function () {
            return this.modelo;
        };
        Vehiculo.prototype.getPrecio = function () {
            return this.precio;
        };
        return Vehiculo;
    }());
    Parcial2.Vehiculo = Vehiculo;
})(Parcial2 || (Parcial2 = {}));
