var peticionHttp = new XMLHttpRequest();
function Load()
{
  getPersona();
  var boton=document.getElementById("btnGuardar");
  boton.addEventListener("click",GuardarClick);
  var botonAbrir=document.getElementById("btnAbrirContenedor");
  botonAbrir.addEventListener("click",AbrirContenedor);
  var btnCerrar=document.getElementById("btnCerrar");
  var btnCancelar=document.getElementById("btnCancelar");
  btnCancelar.addEventListener("click",CerrarContenedor);
  btnCerrar.addEventListener("click", CerrarContenedor);
}
function GuardarClick()
{
  var name= document.getElementById("name")
  var lName= document.getElementById("lName");
  var telefono= document.getElementById("tel");
  var fecha= document.getElementById("dates");
  if(name.value==="")
  {
    name.className="inputError";
    return;
  }
  name.className="inputSinError";
  if(lName.value==="")
  {
    lName.className="inputError";
    return;
  }
    lName.className="inputSinError";
  if(telefono.value==="")
  {
    telefono.className="inputError";
    return;
  }
  EjecutarPost();
  Limpiar(name,lName,telefono,fecha);
}
function AbrirContenedor()
{
  var div=document.getElementById("div");
  div.hidden=false;
}
function CerrarContenedor()
{
  var div=document.getElementById("div");
  div.hidden=true;
}
function $(id)
{
    return document.getElementById(id).value;
}
function Limpiar(name, lName, telefono, fecha)
{
  name.value="";
  lName.value="";
  telefono.value="";
  fecha.value="";
}
function getPersona()
{    
  peticionHttp.onreadystatechange = callback;
  peticionHttp.open("GET","http://localhost:3000/personas",true);
  peticionHttp.send();
  console.log("termino")
                             
}
function EjecutarPost()
{
    var nombre= $("name");
    var apellido= $("lName");
    var telefono= $("tel");
    var fecha= $("dates");
    peticionHttp.onreadystatechange = respuestaPost;
    peticionHttp.open("POST","http://localhost:3000/nuevaPersona");
    peticionHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    peticionHttp.send("nombre="+nombre+"&apellido="+apellido+"&telefono="+telefono+"&fecha="+fecha);
}
function getPersona()
{    
  peticionHttp.onreadystatechange = callback;
  peticionHttp.open("GET","http://localhost:3000/personas",true);
  peticionHttp.send();
  console.log("termino")
                             
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
        
        var trPersona=document.createElement("tr");
        
        var tdnombre=document.createElement("td");
        var tdApellido=document.createElement("td");
        var tdTelefono=document.createElement("td");
        var tdFecha=document.createElement("td");

        
        var tdname= document.createTextNode(json[i].nombre);
        var tdLName=document.createTextNode(json[i].apellido);
        var tdTel=document.createTextNode(json[i].telefono);
        var tdDate=document.createTextNode(json[i].fecha);

        tabla.appendChild(trPersona);

        tdnombre.appendChild(tdname);
        tdApellido.appendChild(tdLName);
        tdTelefono.appendChild(tdTel);
        tdFecha.appendChild(tdDate);

        trPersona.appendChild(tdnombre);
        trPersona.appendChild(tdApellido);
        trPersona.appendChild(tdTelefono);
        trPersona.appendChild(tdFecha);
      }
    }else{
      alert("ERROR");
    }
  }
}
          