namespace Parcial2
{
    var funcion:Funciones;
    window.addEventListener("load",function()
    {
        funcion=new Funciones();
        funcion.$("btnAlta").addEventListener("click",CambiarAlta);
        funcion.$("btnCerrar").addEventListener("click", CambiarAlta);
        funcion.$("btnClose").addEventListener("click", CambiarAlta);
        funcion.$("selTipo").addEventListener("change", ()=>{
            funcion.CambiarTipoDeVehiculo();
        });
        funcion.$("btnAgregar").addEventListener("click", ()=>{
            funcion.Guardar();
        });
        funcion.$("btnPromedio").addEventListener("click", ()=>{
            funcion.CalcularPromedio();
        });
        funcion.$("btnBuscar").addEventListener('click', ()=>{
            funcion.FiltrarVehiculosMarca();
        });
        funcion.$("selFiltrar").addEventListener("change", ()=>{
            funcion.filtrarVehiculos();
        });
    });
    function CambiarAlta():void{
        funcion.MostrarCntAlta();
    }
    export var listaVehiculos:Vehiculo[] = [];
    export class Funciones
    {
        public table:HTMLTableElement;
        public txtMarca:HTMLInputElement;
        public txtModelo:HTMLInputElement;
        public txtPrecio:HTMLInputElement;
        public txtPuertas:HTMLInputElement;
        public cmbCamioneta:HTMLInputElement;
        public selTipo:HTMLSelectElement;
        public selFiltrarMarca:HTMLInputElement;
        
    
        public $(element:string):HTMLElement
        {
            return document.getElementById(element);
        }
    
        constructor()
        {
            this.selTipo = <HTMLSelectElement>this.$("selTipo");
            this.selFiltrarMarca = <HTMLInputElement>this.$("txtSearch");
            this.table = <HTMLTableElement>this.$("tablaVehiculos");
            this.txtMarca = <HTMLInputElement>this.$("txtMarca");
            this.txtModelo = <HTMLInputElement>this.$("txtModelo");
            this.txtPrecio = <HTMLInputElement>this.$("txtPrecio");
            this.txtPuertas = <HTMLInputElement>this.$("txtPuertas");
            this.cmbCamioneta = <HTMLInputElement>this.$("cmbCamioneta");
        }
        public MostrarCntAlta():void
        {
            if(this.$("divContainer").hidden == true)
            {
                this.$("divContainer").hidden = false;
                this.$("body").classList.add("disabled")
            }else{
                this.$("divContainer").hidden = true;
                this.$("body").classList.remove("disabled")
            }        
            
        }
        public CambiarTipoDeVehiculo():void{
            this.$("lblCamioneta").hidden = !this.$("lblCamioneta").hidden;
            this.$("cmbCamioneta").hidden = !this.$("cmbCamioneta").hidden;
            this.$("lblPuertas").hidden = !this.$("lblPuertas").hidden;
            this.$("txtPuertas").hidden = !this.$("txtPuertas").hidden;
        }
        public Guardar()
        {
           
            var camposCompletos:boolean=true;
            if(this.checkValue(this.txtMarca, false) && this.checkValue(this.txtModelo, false) && this.checkValue(this.txtPrecio, true))
            {
                
                if(camposCompletos)
                {
                    let id:number;
                    let marca:string;
                    let modelo:string;
                    let precio:number;
                    let cantPuertas:number;

                    if (listaVehiculos.length == 0) {
                        id = 1;
                    }
                    else {
                        var listaVehiculosAux = listaVehiculos;
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
                    cantPuertas = parseInt(this.txtPuertas.value)
                    if(this.selTipo.value == "auto")
                    {
                        
                        if(!(cantPuertas >1 && cantPuertas<6))
                        {
                            this.txtPuertas.className = "inputError";
                        }else
                        {
                            let auto:Auto;
                            auto = new Auto(id, marca, modelo, precio, cantPuertas)
                            listaVehiculos.push(auto);
                            this.CrearTabla(id.toString(), marca, modelo, precio.toString());
                            this.MostrarCntAlta();
                            this.limpiarInputs();
                        }
                    }else{
                        
                        let camioneta:Camioneta;
                        camioneta = new Camioneta(id, marca, modelo, precio, this.cmbCamioneta.checked)
                        listaVehiculos.push(camioneta);
                        this.CrearTabla(id.toString(), marca, modelo, precio.toString());
                        this.MostrarCntAlta();
                        this.limpiarInputs();
                    }
                    
                }

            }
        }
        public checkValue(element:HTMLInputElement, checkNum:boolean):boolean{
            let cantPuertas:number;
            cantPuertas = parseInt(this.txtPuertas.value);
            var retorno:boolean;
            if(element.value == "" || (checkNum && isNaN(parseInt(element.value))))
            {
                element.className = "inputError";
                
                retorno= false;
            }else
            {
                retorno =true;
            }
            
            return retorno;
        }
        public getTipo():string
        {
            
            return this.selTipo.value;
        }
        public limpiarInputs():void{
            this.txtMarca.value = "";
            this.txtModelo.value = "";
            this.txtPrecio.value = "";
            this.txtPuertas.value = "";
            this.txtMarca.className = "textBox";
            this.txtModelo.className = "textBox";
            this.txtPrecio.className = "textBox";
            this.txtPuertas.className = "textBox";
        }
        public CrearTabla(id:string, marca:string, modelo:string, precio:string)
        {
            let row:HTMLTableRowElement = this.table.insertRow();
            let cell:HTMLTableCellElement = row.insertCell();
            
            cell.innerText = id;
            cell = row.insertCell();
            cell.innerText = marca;
            cell = row.insertCell();
            cell.innerText = modelo;
            cell = row.insertCell();
            cell.innerText = precio;
            cell = row.insertCell();

            let btnDelete:HTMLInputElement = <HTMLInputElement>document.createElement("button");
            btnDelete.addEventListener("click", ()=>{
                this.eliminarRow(row);
             });
            btnDelete.classList.add("button", "btnBad");
            btnDelete.innerText = "Eliminar";
            cell.appendChild(btnDelete);
            
        }
        public eliminarRow(row:HTMLTableRowElement)
        {
            let index:number = row.rowIndex - 1;
            listaVehiculos.splice(index, 1);
            this.table.deleteRow(index);
        }
        public CalcularPromedio() 
        {
            var listaFiltradaGlobal: Array<Vehiculo> = new Array<Vehiculo>();
            var listaPrecio: Array<number>;
            var promedio: number;
            if (listaFiltradaGlobal.length > 0) {
                listaPrecio = listaFiltradaGlobal.map(x => (<Vehiculo>x).precio);
                promedio = listaPrecio.reduce(function (total, num) {
                    total += num;
                    return total;
                }, 0);
            } else {
                listaPrecio = listaVehiculos.map(x => (<Vehiculo>x).precio);
                promedio = listaPrecio.reduce(function (total, num) {
                    total += num;
                    return total;
                }, 0);
            }
            (<HTMLInputElement>document.getElementById("txtPromedio")).value = (promedio / listaPrecio.length).toString();
        }
        public FiltrarVehiculosMarca() 
        {
            console.log("entreFRL");
            var filtro=this.selFiltrarMarca.value;
            var listaBk:Vehiculo[];
            listaBk=listaVehiculos.filter(vehiculo =>{
               return vehiculo.marca.toLowerCase().indexOf(filtro) >-1;
            });
            this.clearTable();
            listaBk.forEach((item)=>{
                this.CrearTabla(item.id.toString(), item.marca, item.modelo, item.precio.toString());
            });
        }
        
        isAuto(vehiculo: Auto | Camioneta | Vehiculo): vehiculo is Auto {
            return (<Auto>vehiculo).cantPuertas !== undefined;
        }
        public clearTable():void{
            
            listaVehiculos.forEach(()=>{
                try{
                    this.table.deleteRow(0); 
                }catch(err){
    
                }
            });
        }
        public filtrarVehiculos():void{
            let selFiltrar:HTMLSelectElement = <HTMLSelectElement>this.$("selFiltrar");
            let vehiculosFiltrados:Vehiculo[];
            if(selFiltrar.value == "auto")
            {
                vehiculosFiltrados = listaVehiculos.filter((item)=>{
                    return this.isAuto(item);
                });
            }else if(selFiltrar.value == "camioneta"){
                vehiculosFiltrados = listaVehiculos.filter((item)=>{
                    return !this.isAuto(item);
                });
            }else{
                vehiculosFiltrados = listaVehiculos;
            }
            this.clearTable();
            vehiculosFiltrados.forEach((item)=>{
                this.CrearTabla(item.id.toString(), item.marca, item.modelo, item.precio.toString());
            });
        }

    }
}