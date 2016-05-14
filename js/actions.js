var fn = {
	deviceready: function(){
		document.addEventListener("deviceready", fn.init, false);
	},

	init: function(){
		// CHECAR SI USUARIO ESTA REGISTRADO
		if(!fn.estaRegistrado()){
			//window.location.href="#registro";
		}

		$("#registrar").tap(fn.registrar);
		$("#boton-ubicacion").tap(fn.mostrarUbicacion);

		fn.renderizarProductos();
		
		$(".productos-link").tap(function(){
			// RENDERIZAR LOS PRODUCTOS
			fn.renderizarProductos($(this).attr("categoria"));
			$("#menu").panel("close");
		});
	},

	renderizarProductos: function(categoria){
		if(categoria == undefined){
			categoria = "todos";
		}

		var contenedor = $("#productosListado");
		contenedor.empty();

		$("#tituloProductos").html(categoria);

		var impar = 1;

		productos.forEach(function(elemento){
			if(elemento.categoria == categoria || categoria == "todos"){
				if(impar){
					contenedor.append('<div class="ui-block-a"><img class="productos" idProducto="'+elemento.id+'" src="img/'+elemento.imagen+'"><div class="precio">'+elemento.precio+'</div></div>');
					impar = 0;
				}else{
					contenedor.append('<div class="ui-block-b"><img class="productos" idProducto="'+elemento.id+'" src="img/'+elemento.imagen+'"><div class="precio">'+elemento.precio+'</div></div>');
					impar = 1;
				}
			}
		});

		$(".productos").tap(fn.productoDetalle);
	},

	productoDetalle: function(){
		id = $(this).attr("idProducto");

		var producto = productos.filter(function(obj){
			return obj.id == id;
		});

		var img = '<img src="img/'+producto[0].imagen+'">';

		$("#tabla-detalle .imagen").html(img);
		$("#tabla-detalle .nombre").html(producto[0].nombre);
		$("#tabla-detalle .descripcion").html(producto[0].descripcion);
		$("#tabla-detalle .categoria").html(producto[0].categoria);
		$("#tabla-detalle .cantidad").html(producto[0].cantidad);
		$("#tabla-detalle .precio").html(producto[0].precio);

		$.mobile.changePage($("#detalles"));
	},

	mostrarUbicacion: function(){
		$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCKrZkh24ZjiYdD0BS445a5NjNEtn6oBeg&callback=mapa');
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
			window.location.href = "#productos";

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
//$(fn.deviceready);

fn.init();