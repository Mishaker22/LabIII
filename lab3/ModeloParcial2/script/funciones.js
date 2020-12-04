var Parcial2;
(function (Parcial2) {
    var funcion;
    window.addEventListener("load", function () {
        funcion = new Funciones();
        funcion.$("btnAlta").addEventListener("click", CambiarAlta);
        funcion.$("btnCerrar").addEventListener("click", CambiarAlta);
        funcion.$("btnClose").addEventListener("click", CambiarAlta);
        funcion.$("selTipo").addEventListener("change", function () {
            funcion.CambiarTipoDeVehiculo();
        });
        funcion.$("btnAgregar").addEventListener("click", function () {
            funcion.Guardar();
        });
        funcion.$("btnPromedio").addEventListener("click", function () {
            funcion.CalcularPromedio();
        });
        funcion.$("btnBuscar").addEventListener('click', function () {
            funcion.FiltrarVehiculosMarca();
        });
        funcion.$("selFiltrar").addEventListener("change", function () {
            funcion.filtrarVehiculos();
        });
    });
    function CambiarAlta() {
        funcion.MostrarCntAlta();
    }
    Parcial2.listaVehiculos = [];
    var Funciones = /** @class */ (function () {
        function Funciones() {
            this.selTipo = this.$("selTipo");
            this.selFiltrarMarca = this.$("txtSearch");
            this.table = this.$("tablaVehiculos");
            this.txtMarca = this.$("txtMarca");
            this.txtModelo = this.$("txtModelo");
            this.txtPrecio = this.$("txtPrecio");
            this.txtPuertas = this.$("txtPuertas");
            this.cmbCamioneta = this.$("cmbCamioneta");
        }
        Funciones.prototype.$ = function (element) {
            return document.getElementById(element);
        };
        Funciones.prototype.MostrarCntAlta = function () {
            if (this.$("divContainer").hidden == true) {
                this.$("divContainer").hidden = false;
                this.$("body").classList.add("disabled");
            }
            else {
                this.$("divContainer").hidden = true;
                this.$("body").classList.remove("disabled");
            }
        };
        Funciones.prototype.CambiarTipoDeVehiculo = function () {
            this.$("lblCamioneta").hidden = !this.$("lblCamioneta").hidden;
            this.$("cmbCamioneta").hidden = !this.$("cmbCamioneta").hidden;
            this.$("lblPuertas").hidden = !this.$("lblPuertas").hidden;
            this.$("txtPuertas").hidden = !this.$("txtPuertas").hidden;
        };
        Funciones.prototype.Guardar = function () {
            var camposCompletos = true;
            if (this.checkValue(this.txtMarca, false) && this.checkValue(this.txtModelo, false) && this.checkValue(this.txtPrecio, true)) {
                if (camposCompletos) {
                    var id = void 0;
                    var marca = void 0;
                    var modelo = void 0;
                    var precio = void 0;
                    var cantPuertas = void 0;
                    if (Parcial2.listaVehiculos.length == 0) {
                        id = 1;
                    }
                    else {
                        var listaVehiculosAux = Parcial2.listaVehiculos;
                        id = listaVehiculosAux.reduce(function (maximo, vehiculo) {
                            if (vehiculo.getId() >= maximo) {
                                return vehiculo.getId() + 1;
                            }
                            return maximo;
                        }, 0);
                    }
                    marca = this.txtMarca.value;
                    modelo = this.txtModelo.value;
                    precio = parseInt(this.txtPrecio.value);
                    cantPuertas = parseInt(this.txtPuertas.value);
                    if (this.selTipo.value == "auto") {
                        if (!(cantPuertas > 1 && cantPuertas < 6)) {
                            this.txtPuertas.className = "inputError";
                        }
                        else {
                            var auto = void 0;
                            auto = new Parcial2.Auto(id, marca, modelo, precio, cantPuertas);
                            Parcial2.listaVehiculos.push(auto);
                            this.CrearTabla(id.toString(), marca, modelo, precio.toString());
                            this.MostrarCntAlta();
                            this.limpiarInputs();
                        }
                    }
                    else {
                        var camioneta = void 0;
                        camioneta = new Parcial2.Camioneta(id, marca, modelo, precio, this.cmbCamioneta.checked);
                        Parcial2.listaVehiculos.push(camioneta);
                        this.CrearTabla(id.toString(), marca, modelo, precio.toString());
                        this.MostrarCntAlta();
                        this.limpiarInputs();
                    }
                }
            }
        };
        Funciones.prototype.checkValue = function (element, checkNum) {
            var cantPuertas;
            cantPuertas = parseInt(this.txtPuertas.value);
            var retorno;
            if (element.value == "" || (checkNum && isNaN(parseInt(element.value)))) {
                element.className = "inputError";
                retorno = false;
            }
            else {
                retorno = true;
            }
            return retorno;
        };
        Funciones.prototype.getTipo = function () {
            return this.selTipo.value;
        };
        Funciones.prototype.limpiarInputs = function () {
            this.txtMarca.value = "";
            this.txtModelo.value = "";
            this.txtPrecio.value = "";
            this.txtPuertas.value = "";
            this.txtMarca.className = "textBox";
            this.txtModelo.className = "textBox";
            this.txtPrecio.className = "textBox";
            this.txtPuertas.className = "textBox";
        };
        Funciones.prototype.CrearTabla = function (id, marca, modelo, precio) {
            var _this = this;
            var row = this.table.insertRow();
            var cell = row.insertCell();
            cell.innerText = id;
            cell = row.insertCell();
            cell.innerText = marca;
            cell = row.insertCell();
            cell.innerText = modelo;
            cell = row.insertCell();
            cell.innerText = precio;
            cell = row.insertCell();
            var btnDelete = document.createElement("button");
            btnDelete.addEventListener("click", function () {
                _this.eliminarRow(row);
            });
            btnDelete.classList.add("button", "btnBad");
            btnDelete.innerText = "Eliminar";
            cell.appendChild(btnDelete);
        };
        Funciones.prototype.eliminarRow = function (row) {
            var index = row.rowIndex - 1;
            Parcial2.listaVehiculos.splice(index, 1);
            this.table.deleteRow(index);
        };
        Funciones.prototype.CalcularPromedio = function () {
            var listaFiltradaGlobal = new Array();
            var listaPrecio;
            var promedio;
            if (listaFiltradaGlobal.length > 0) {
                listaPrecio = listaFiltradaGlobal.map(function (x) { return x.precio; });
                promedio = listaPrecio.reduce(function (total, num) {
                    total += num;
                    return total;
                }, 0);
            }
            else {
                listaPrecio = Parcial2.listaVehiculos.map(function (x) { return x.precio; });
                promedio = listaPrecio.reduce(function (total, num) {
                    total += num;
                    return total;
                }, 0);
            }
            document.getElementById("txtPromedio").value = (promedio / listaPrecio.length).toString();
        };
        Funciones.prototype.FiltrarVehiculosMarca = function () {
            var _this = this;
            console.log("entreFRL");
            var filtro = this.selFiltrarMarca.value;
            var listaBk;
            listaBk = Parcial2.listaVehiculos.filter(function (vehiculo) {
                return vehiculo.marca.toLowerCase().indexOf(filtro) > -1;
            });
            this.clearTable();
            listaBk.forEach(function (item) {
                _this.CrearTabla(item.id.toString(), item.marca, item.modelo, item.precio.toString());
            });
        };
        Funciones.prototype.isAuto = function (vehiculo) {
            return vehiculo.cantPuertas !== undefined;
        };
        Funciones.prototype.clearTable = function () {
            var _this = this;
            Parcial2.listaVehiculos.forEach(function () {
                try {
                    _this.table.deleteRow(0);
                }
                catch (err) {
                }
            });
        };
        Funciones.prototype.filtrarVehiculos = function () {
            var _this = this;
            var selFiltrar = this.$("selFiltrar");
            var vehiculosFiltrados;
            if (selFiltrar.value == "auto") {
                vehiculosFiltrados = Parcial2.listaVehiculos.filter(function (item) {
                    return _this.isAuto(item);
                });
            }
            else if (selFiltrar.value == "camioneta") {
                vehiculosFiltrados = Parcial2.listaVehiculos.filter(function (item) {
                    return !_this.isAuto(item);
                });
            }
            else {
                vehiculosFiltrados = Parcial2.listaVehiculos;
            }
            this.clearTable();
            vehiculosFiltrados.forEach(function (item) {
                _this.CrearTabla(item.id.toString(), item.marca, item.modelo, item.precio.toString());
            });
        };
        return Funciones;
    }());
    Parcial2.Funciones = Funciones;
})(Parcial2 || (Parcial2 = {}));
