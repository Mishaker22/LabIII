var peticionHttp = new XMLHttpRequest();
window.addEventListener("load",Cargar)

function Cargar()
{
    var send=document.getElementById("btnSend");
    var clean=document.getElementById("btnReset");

    clean.addEventListener("click", function(){
        LimpiarLogin();
    });
    send.addEventListener("click", function(){
        //ValidarUsuario();
        EjecutarPost();
    });            
}
function EjecutarPost()
{
    var usr= $("user");
    var pass= $("pass");
    peticionHttp.onreadystatechange = callback;
    peticionHttp.open("POST","http://localhost:3000/loginUsuario");
    peticionHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    peticionHttp.send("usr="+usr+"&pass="+pass);
}
function ValidarUsuario()
{
    var usr= $("user");
    var pass= $("pass");
    peticionHttp.onreadystatechange = callback;
    peticionHttp.open("GET","http://localhost:3000/loginUsuario?usr="+usr+"&pass="+pass,true);
    peticionHttp.send();
    console.log("termino")
                   
}
function callback(){
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
function LimpiarLogin()
{
    var usr= $("user");
    var pass= $("pass");
    usr.value="";
    pass.value="";
}