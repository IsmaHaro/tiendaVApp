var fn = {
	deviceready: function(){
		document.addEventListener("deviceready", fn.init, false);
	},

	init: function(){
		// CHECAR SI USUARIO ESTA REGISTRADO
		if(!fn.estaRegistrado()){
			window.location.href="#registro";
		}

		$("#registrar").tap(fn.registrar);
	},

	registrar: function(){
		var nombre = $("#nombreR").val();
		var email = $("#emailR").val();
		var password = $("#passwordR").val();

		try{
			if(nombre == ""){
				throw new Error("Debe de agregar nombre");
			}

			if(email == ""){
				throw new Error("Debe de agregar email");
			}

			if(password == ""){
				throw new Error("Debe de agregar contraseña");
			}

			// Guardar Datos
			almacen.guardarUsuarios(email, password);

			window.localStorage.setItem("user", nombre);
			window.location.href = "#todos";

		}catch(error){
			alert(error);
		}
	},

	estaRegistrado: function(){
		if(window.localStorage.getItem("user")){
			return true;
		}

		return false;
	}
};

// EJECUTAR EN PHONEGAP
$(fn.deviceready);