var peticionHttp = new XMLHttpRequest();
var listaJson= new Array();
var Persona;
var evento;
function Load()
{
  getPersona(); 
}
function getPersona()
{    
  peticionHttp.onreadystatechange = callback;
  peticionHttp.open("GET","http://localhost:3000/personas",true);
  peticionHttp.send();
  console.log("termino")
                             
}
function callback()
{
  tabla=document.getElementById("tbDatos");
  if(peticionHttp.readyState===4)
  {
    if(peticionHttp.status===200)
    {
      var respuesta=peticionHttp.responseText;
      var json= JSON.parse(respuesta);
      for(var i=0; i<json.length;i++)
      {
        var listaTr=new Array();
        var trPersona=document.createElement("tr");
        
        var tdnombre=document.createElement("td");
        var tdApellido=document.createElement("td");
        var tdFecha=document.createElement("td");
        var tdSexo=document.createElement("td");

        
        var tdname= document.createTextNode(json[i].nombre);
        var tdLName=document.createTextNode(json[i].apellido);
        var tdDate=document.createTextNode(json[i].fecha);
        var txSexo=document.createTextNode(json[i].sexo);

        tabla.appendChild(trPersona);

        tdnombre.appendChild(tdname);
        tdApellido.appendChild(tdLName);
        tdFecha.appendChild(tdDate);
        tdSexo.appendChild(txSexo);

        trPersona.appendChild(tdnombre);
        trPersona.appendChild(tdApellido);
        trPersona.appendChild(tdFecha);
        trPersona.appendChild(tdSexo);
        
        var element=document.getElementsByTagName("tr");
        for(var j=0; j<element.length; j++)
        {
          listaTr.push(element[i]);
        }
        DobleClick(listaTr);       
        listaJson.push(json[i]);
      }
    }else{
      alert("ERROR");
    }
  }
}
function DobleClick(listaTr)
{
  for(var i=0; i<listaTr.length; i++)
  {
    listaTr[i].addEventListener("dblclick", CompletarCampos, false);
  }
} 
CompletarCampos=function(event)
{
  Inputs();
  var name= document.getElementById("name")
  var lName= document.getElementById("lName");
  var fecha= document.getElementById("dates");
  var sexo=document.getElementsByName("Sexo");
  if (event.target.tagName == "TD")
  { 
    var fila = event.target.parentNode;
    name.value = fila.children[0].innerHTML
    lName.value = fila.children[1].innerHTML
    fecha.value = fila.children[2].innerHTML
    sexo.value=fila.children[3].innerHTML

    if(sexo.value=="Female")
    {
      sexo=document.getElementById("sF").checked=true;
    }else{
      sexo=document.getElementById("sM").checked=true;
    }
    if(CompararPersonas(name.value, lName.value)!=false)
    {
      Persona=CompararPersonas(name.value, lName.value);
    }
    evento=event;
  }
}
function Inputs()
{
  AbrirContenedor();
}
function AbrirContenedor()
{
  var div=document.getElementById("div");
  div.hidden=false;
  var btnModificar=document.getElementById("btnModificar");
  btnModificar.addEventListener("click",GuardarClick);
  var btnCerrar=document.getElementById("btnCerrar");
  var btnEliminar=document.getElementById("btnEliminar");
  btnEliminar.addEventListener("click",EliminarFila);
  btnCerrar.addEventListener("click", CerrarContenedor);
}
function CompararPersonas(nombre, apellido)
{
  var retorno=false;
  for(var i=0; i<listaJson.length; i++)
  {
    if(nombre == listaJson[i].nombre && apellido== listaJson[i].apellido)
    {
      retorno=listaJson[i];
    }
  }
  return retorno;
}
function CerrarContenedor()
{
  var div=document.getElementById("div");
  div.hidden=true;
}
function GuardarClick()
{
  var name= document.getElementById("name")
  var lName= document.getElementById("lName");
  var fecha= document.getElementById("dates");
  var sexoF=document.getElementById("sF");
  var sexoM=document.getElementById("sM");
  if(Persona.sexo==="Female" && sexoM.checked==true )
  {
    var auxSexo="Male";
  }else if(Persona.sexo==="Male" && sexoF.checked==true)
  {
    var auxSexo="Female";
  }else if(Persona.sexo==="Female")
  {
    var auxSexo="Female";
  }else if(Persona.sexo==="Male")
  {
    var auxSexo="Male";
  }

  ValidarCampos(name,lName,fecha);
  EditarContenedor(name,lName,fecha,auxSexo);
  Spinner();
  EjecutarPost(name,lName,fecha,auxSexo);
}
function EditarContenedor(name,lName,fecha,sexo)
{
  evento.preventDefault();
  var fila = evento.target.parentNode;
  var tabla=document.getElementById("tbDatos");
  var aux=new Array(name.value,lName.value,fecha.value,sexo);
  var nuevoNodo=CrearNodo(aux);
  tabla.replaceChild(nuevoNodo,fila);
}
  
function ValidarCampos(name, lName, fecha)
{
  
  if(name.value.length <=3)
  {
    name.className="inputError";
    return;
  }
  name.className="inputSinError";
  if(lName.value.length<=3)
  {
    lName.className="inputError";
    return;
  }
    lName.className="inputSinError";
  if(!document.querySelector('input[name="Sexo"]:checked')) 
  {
    alert('Error, rellena el campo Sexo');
  }
  var fechaAct=hoyFecha();
  if(fecha.value>fechaAct)
  {
    alert("La fecha debe ser anterior a la fecha actual");
  }
  //Limpiar(name,lName,telefono,fecha);
}
function hoyFecha(){
  var fecha = new Date(); //Fecha actual
  var mes = fecha.getMonth()+1; //obteniendo mes
  var dia = fecha.getDate(); //obteniendo dia
  var ano = fecha.getFullYear(); //obteniendo año
  if(dia<10)
    dia='0'+dia; //agrega cero si el menor de 10
  if(mes<10)
    mes='0'+mes //agrega cero si el menor de 10
  var fecha=ano+"-"+mes+"-"+dia;
  return fecha;
}
function EjecutarPost(name,lName,fecha,auxSexo)
{
  peticionHttp.onreadystatechange = respuestaPost;
  peticionHttp.open("POST"," http://localhost:3000/editar");
  peticionHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  peticionHttp.send("id="+Persona.id+"&nombre="+name.value+"&apellido="+lName.value+"&fecha="+fecha.value+"&sexo="+auxSexo);
}
function EjecutarPostEliminar(persona)
{
  peticionHttp.onreadystatechange = respuestaPost;
  peticionHttp.open("POST","http://localhost:3000/eliminar");
  peticionHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  peticionHttp.send("id="+persona.id+"&nombre="+persona.nombre+"&apellido="+persona.apellido+"&fecha="+persona.fecha+"&sexo="+persona.sexo);
}
function respuestaPost(){
  if(peticionHttp.readyState===4){
      if(peticionHttp.status===200){
          $respuesta=peticionHttp.responseText;
          alert($respuesta);
      }else{
          alert("ERROR");
      }
  }
}
function $(id)
{
    return document.getElementById(id).value;
}
function Limpiar()
{
  var name= document.getElementById("name");
  var lName=document.getElementById("lName");
  var fecha= document.getElementById("dates");
  var sexo=document.getElementById("sF");
  var sexoM=document.getElementById("sM");

  name.value="";
  lName.value="";
  fecha.value="";
  sexo.checked=false
  sexoM.checked=false
}
function CrearNodo(persona)
{
  var trPersona=document.createElement("tr");
        
  var tdnombre=document.createElement("td");
  var tdApellido=document.createElement("td");
  var tdFecha=document.createElement("td");
  var tdSexo=document.createElement("td");

        
  var tdname= document.createTextNode(persona[0]);
  var tdLName=document.createTextNode(persona[1]);
  var tdDate=document.createTextNode(persona[2]);
  var txSexo=document.createTextNode(persona[3]);

  //tabla.appendChild(trPersona);

  tdnombre.appendChild(tdname);
  tdApellido.appendChild(tdLName);
  tdFecha.appendChild(tdDate);
  tdSexo.appendChild(txSexo);

  trPersona.appendChild(tdnombre);
  trPersona.appendChild(tdApellido);
  trPersona.appendChild(tdFecha);
  trPersona.appendChild(tdSexo);
  return trPersona;
}

function Spinner()
{
  var charge=document.getElementById("spinner");
  charge.hidden=false;
  
}
function EliminarFila()
{
  evento.preventDefault();
  var fila = evento.target.parentNode;
  EjecutarPostEliminar(Persona)
  var tabla=document.getElementById("tbDatos");
  tabla.removeChild(fila);
  Limpiar();
}
