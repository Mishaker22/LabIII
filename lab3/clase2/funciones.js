 /*
        window.addEventListener("send",function(){
            var boton= document.getElementById("btn");
            alert(boton.value);
        }); TAMBIEN SE PUDE USAR UN MANEJADOR ASI*/

        window.addEventListener("load",CargarPagina);

        function CargarPagina()
        {
            var send=document.getElementById("btnSend");
            var usuario=document.getElementById("usr");
            var contraseña=document.getElementById("pass");

            send.addEventListener("click", function(){
                Entrar(usuario,contraseña);
                EjecutarPost();
            });
        }
        function EjecutarPost()
        {

        }
        function Entrar(usuario, contraseña)
        {
            if(usuario.value==="Mishaker" && contraseña.value==="Michii122")
            {
                //document.write('Ingresar a mi blog'.link('./recordar.html'));
                window.location="./recordar.html";
            }else if(usuario.value==="" && contraseña.value==="")
            {
                alert("Error. Debe completar los campos");
            }
            else
            {
                alert("Contraseña o usuario incorrecto");
            }
        }
        function GuardarClick()
        {
            var name=document.getElementById("name");
            var lName=document.getElementById("lName");
    
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
            var tbDatos=document.getElementById("tbDatos");
            tbDatos.innerHTML=tbDatos.innerHTML+"<tr><td>"+name.value+"</td><td>"+lName.value+"</td><td><a href='#'>Modificar</a></td></tr>";
            Limpiar(name,lName);
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
         function Load()
         {
            var boton=document.getElementById("btnGuardar");
            boton.addEventListener("click",GuardarClick);
            var botonAbrir=document.getElementById("btnAbrirContenedor");
            botonAbrir.addEventListener("click",AbrirContenedor);
            var btnCerrar=document.getElementById("btnCerrar");
            var btnCancelar=document.getElementById("btnCancelar");
            btnCancelar.addEventListener("click",CerrarContenedor);
            btnCerrar.addEventListener("click", CerrarContenedor);
         }
         function Limpiar(name, lName)
         {
            name.value="";
            lName.value="";
         }