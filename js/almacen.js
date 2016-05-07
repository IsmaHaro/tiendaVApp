var almacen = {
	conectarDB: function(){
		return window.openDatabase("tiendaVApp", "1.0", "Hotel App", 200000);
	},
	error: function(error){
		alert("Error: "+error.message);
	},
	exito: function(){
		//alert("Exito");
	},

	guardarUsuarios: function(correo, password){
		almacen.db       = almacen.conectarDB();
		almacen.correo   = correo;
		almacen.password = password;
		almacen.db.transaction(almacen.tablaUsuarios, almacen.error, almacen.exito);
	},

	tablaUsuarios: function(tx){
		// CREAR TABLA DE USUARIOS
		tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, correo, password)');

		// INSERTAR LOS DATOS
		tx.executeSql('INSERT INTO usuarios (correo, password) VALUES ("'+almacen.correo+'", "'+almacen.password+'")');
	}
};